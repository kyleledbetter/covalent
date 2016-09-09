import {Component, Input, AfterViewInit, ViewChild, ElementRef, Inject, forwardRef} from '@angular/core';
import { TdChartsComponent } from '../charts.component';

declare let d3: any;

@Component({
  moduleId: module.id,
  selector: 'td-chart-line',
  styleUrls: ['chart-line.component.css'],
  templateUrl: 'chart-line.component.html',
})

export class TdChartLineComponent implements AfterViewInit {

  private _margin: any = {top: 50, right: 150, bottom: 50, left: 50};
  private _width: number;
  private _height: number;
  private _padding: number;
  private _lineColumns: string[] = [];
  private _lineTitles: string[] = [];
  private _colors: string[] = [];

  private _shadowDepth: any[] = [];
  private _tickHeightSize: number = 0;
  private _tickWidthSize: number = 0;
  private _grid: string = '';
  private _colorPalette: string[] = [];
  private _parentObj: any;
  private _chartTitle: string;
  private _shadowColor: string;
  private _fillOpacity: number = 0;
  private _leftAxisTitle: string;

  @ViewChild('linechart') content: ElementRef;

  /**
   * dataSrc?: string.
   */
  @Input('dataSrc') dataSrc: string = '';

  /**
   * contentType?: string.
   * Content Type of the Chart
   */
  @Input('contentType') contentType: string = '';

  /**
   * bottomAxis?: string.
   */
  @Input('bottomAxis') bottomAxis: string = '';

  @Input('lineColumns')
  set lineColumns(lineColumns: string[]) {
    this._lineColumns = lineColumns;
  }

  @Input('lineTitles')
  set lineTitles(lineTitles: string[]) {
    this._lineTitles = lineTitles;
  }

  @Input('colors')
  set colors(colors: string[]) {
    this._colors = colors;
  }

  constructor(@Inject(forwardRef(() => TdChartsComponent)) private _parent: TdChartsComponent) {
    this._parentObj = _parent;
  }

  ngAfterViewInit(): void {
    this.render();
  }

  render(): void {
    this._margin.top = 50;
    this._width = 960 - this._margin.left - this._margin.right;
    this._height = 500 - this._margin.top - this._margin.bottom;
    this._padding = 100;

    if (this._parentObj.chartTitle) {
      this._chartTitle = this._parentObj.chartTitle;
    }

    if (this._parentObj.colorPalette) {
      this._colorPalette = this._parentObj.colorPalette;
    }

    if (this._parentObj.ticks === 'true') {
      this._tickHeightSize = -this._height;
      this._tickWidthSize = -this._width;
    }

    if (this._parentObj.grid === 'true') {
      this._grid = 'grid';
    }

    if (this._parentObj.shadowDepth) {
      this._shadowDepth =  this._parentObj.shadowDepth;
    }

    if (this._parentObj.shadowColor) {
      this._shadowColor = this._parentObj.shadowColor;
    }

    if (this._parentObj.fillOpacity) {
      this._fillOpacity = this._parentObj.fillOpacity;
    }

    if (this._parentObj.leftAxisTitle) {
      this._leftAxisTitle = this._parentObj.leftAxisTitle;
    }

    let x: any = d3.scaleLinear().range([0, this._width]);
    let y: any = d3.scaleLinear().range([this._height, 0]);
    let color: any = d3.scaleOrdinal(this._colors);

    let drawLine: any = d3.line()
      .curve(d3.curveBasis)
      .x((d: any) => { return x(d.xValue); })
      .y((d: any) => { return y(d.yValue); });

    let viewBoxWidth: number = this._width + this._margin.left + this._margin.right;
    let viewBoxHeight: number = this._height + this._margin.top + this._margin.bottom;

    let svg: any = d3.select('.linechart')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + (viewBoxHeight))
      .classed('svg-content-responsive', true)
      .append('g')
      .attr('transform', 'translate(' + this._padding + ',' + this._margin.top + ')');

    let defs: any = svg.append('defs');

    let filter: any = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', this._shadowDepth[0]);

    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', this._shadowDepth[1])
      .attr('result', 'blur');

    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', this._shadowDepth[2])
      .attr('dy', this._shadowDepth[3])
      .attr('result', 'offsetBlur');

    // feFlood flood-color is the drop-shadow color
    filter.append('feFlood')
      .attr('flood-color', this._shadowColor);

    // this is needed to apply the feFlood
    filter.append('feComposite')
      .attr('in2', 'offsetBlur')
      .attr('operator', 'in');

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    let feMerge: any = filter.append('feMerge');

    // NOTE: we need the empty feMergeNode to apply the feComposite & feFlood
    feMerge.append('feMergeNode');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // feComponentTransfer linear slope adjusts the opacity of the ENTIRE SVG 
    let feComponentTransfer: any = filter.append('feComponentTransfer');
    feComponentTransfer.append('feFuncA')
      .attr('type', 'linear')
      .attr('slope', this._fillOpacity);

    enum ParseContent {
      json = d3.json,
      csv = d3.csv,
      tsv = d3.tsv
    }

    ParseContent[this.contentType](this.dataSrc, (error: string, data: any) => {
      if (error) {
        throw error;
      }

      let lines: Object = this._lineColumns.map((id: any) => {
        return {
          id: id,
          values: data.map((d: any) => {
            return {xValue: d[this.bottomAxis], yValue: d[id]};
          }),
        };
      });

      x.domain(d3.extent(data, (d: any) => { return d[this.bottomAxis]; }));

      y.domain([
        d3.min(lines, (c: any) => { return d3.min(c.values, (d: any) => { return d.yValue; }); }),
        d3.max(lines, (c: any) => { return d3.max(c.values, (d: any) => { return d.yValue; }); }),
      ]);

      // add the X gridlines
      svg.append('g')
        .attr('class', this._grid)
        .attr('transform', 'translate(0,' + this._height + ')')
        .call(d3.axisBottom(x)
             .tickSize(this._tickHeightSize)
             .tickFormat('')
        );

      // add the Y gridlines
      svg.append('g')
        .attr('class', this._grid)
        .call(d3.axisLeft(y)
             .tickSize(this._tickWidthSize)
             .tickFormat('')
        );

      svg.append('g')
        .attr('class', 'ticks ticks-x')
        .attr('transform', 'translate(0,' + this._height + ')')
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('class', 'ticks ticks-y')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text(this._leftAxisTitle);

      let line: any = svg.selectAll('.lineTitle')
        .data(lines)
        .enter().append('g')
        .attr('class', 'lineTitle');

      line.append('path')
        .attr('class', 'line')
        .attr('d', (d: any) => { return drawLine(d.values); })
        .style('stroke', (d: any) => { return color(d.id); })
        .style('filter', 'url(#drop-shadow)');

      line.append('text')
        .datum((d: any) => { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr('transform', (d: any) => { return 'translate(' + x(d.value.xValue) + ',' + y(d.value.yValue) + ')'; })
        .attr('x', 3)
        .attr('dy', '0.35em')
        .style('font', '10px sans-serif')
        .text((d: any, i: number) => { return this._lineTitles[i]; });

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(' + (this._width / 2) + ',' + (0 - (this._margin.top / 2)) + ')')
        .text(this._chartTitle)
        .attr('class', 'md-title');

    });
  }
}
