'use strict';

/* Import Velocity library to control the non-svg elements */
// Simplified Velocity function
var $v = Velocity;

/* Queuing process */
var queue = function() {
	this.queueTasks = [];
}
queue.prototype.taskConst = function(fn, args) {
	return { f: fn, fArgs: args }
}

queue.prototype.push = function(task) {
	this.queueTasks.push(task);
}

queue.prototype.pushTasks = function(tasks) {
	for ( var i in tasks ) {
		this.queueTasks.push(tasks[i]);
	}
}

queue.prototype.shift = function() {
	return this.queueTasks.shift()
}
queue.prototype.queuing = function(complete) {

	var self = this,
		task = 
			(self.queueTasks !== []) ?
				self.shift() : null;

	// A p which is returned from a task object with promise 
	var p = (task) ? task.f.apply(this, task.fArgs): null;
		
	if (p) {
		// The p.then won't run util the state truns to be resolved.
		p.then(function() {
			self.queuing(complete);
		});
	} else {
		if (complete) {
			complete();
		}
	}
}

var colorClass = function() {

	this.bar = {

		// For 竊盜案件 (Police)
		'合計發生件數': '#70C1B3',
		'重大竊盜發生件數': '#F25F5C',
		'普通竊盜發生件數': '#FFE066',
		'汽車竊盜發生件數': '#247BA0',	
		'機車竊盜發生件數': '#2C5B26',

		'重大竊盜破獲件數': '#9BC53D',
		'重大竊盜尚未破獲件數': '#E55934',

		'普通竊盜破獲件數': '#5BC0EB',
		'普通竊盜尚未破獲件數': '#FA7921',

		'汽機車竊盜案件': '#00A8E8',

		'汽車竊盜破獲件數': '#EF233C',
		'汽車竊盜尚未破獲件數': '#EDF2F4',
		'汽車竊盜破獲率': '#0CCA4A',
		'汽車竊盜嫌疑犯人數': '#F24B48',

		'機車竊盜破獲件數': '#35C3D6',
		'機車竊盜尚未破獲件數': '#FF1654',
		'機車竊盜嫌疑犯人數': '#FFD000',

		// For 殺人罪 (Prosecution)

		// For 兒童及少年性交易防制條例 (Prosecution),
		'被告人數': '#FC7B29',
		'死刑': '#C20446',
		// '無期徒刑': '#E5404C',
		// '有期徒刑': '#FD9C3C',
		'無期徒刑': '#FD9C3C',
		'有期徒刑': '#E5404C',
		'拘役': '#FFB14A',
		'罰金': '#F68989',
		'緩刑人數': '#9F89F4',
		'免刑': '#53B4C4',
		'無罪': '#2BA608',
		'不受理': '#646561',
		'累犯人數': '#D13F37',
		'保安處分人數': '#809176',

		// For 監獄人數概況 (Correction)
		'本年執行人數': '#BA0F30',
		'本年入監人數': '#C41F3A',
		'新入監人數': '#61B045',
		'上年底留監人數': '#E9C247',
		'本年出獄人數': '#F16B23',
		'本年年底留監人數': '#55B5DF',

		// For 地方法院刑事案件收結情形
		'案件數': '#4979BC',
		'舊受': '#5C4491',
		'新受': '#4CA0E0',
		'終結': '#3B8AE5',
		'未結': '#822979',

		'平均每法官每月辦結件數': '#E71D36',
		'終結案件中平均一件所需日數': '#FF9F1C',
		'上訴案件維持率': '#2D73C4',
		'抗告案件維持率': '#169976',

		// For 犯次分類 (Correction)
		'累犯': '#E5404C',
		'再犯': '#F16B23',
		'初犯': '#F68989'
		
	},
	this.line = {
		// For 監獄人數概況 (Correction)
		'本年執行人數': '#BA0F30',
		'本年入監人數': '#C41F3A',
		'新入監人數': '#61B045',
		'上年底留監人數': '#E9C247',
		'本年出獄人數': '#F16B23',
		'本年年底留監人數': '#55B5DF'
	},
	this.rings = [
		{
			name: '新入監前家庭狀況',
			value: {
				'不詳': '#6B96AD',
				'貧困無以為生': '#669FCC',
				'免足維持生活': '#5FA4D4',
				'小康之家': '#58ABD8',
				'中產之上': '#55B5DF'
			}
		},
		{
			name: '新入監犯罪次數與種類',
			value: {
				'累犯': '#F16B23',
				'再犯': '#F27422',
				'初犯': '#ED8222'
			}
		},
		{
			name: '新入監前教育程度',
			value: {
				'大專以上': '#61B045',
				'高中職': '#6EBE44',
				'國中': '#78C14A',
				'國小': '#87C66A',
				'自修': '#8CBC71',
				'不識字': '#8AB276',
				'不詳': '#8AA679'
			}
		},
		{
			name: '歷年新入監年齡歷年統計',
			value: {
				'14 ~ 18': '#A885A4',
				'18 ~ 20': '#AA77A2',
				'20 ~ 24': '#B26DA5',
				'24 ~ 30': '#B765A5',
				'30 ~ 40': '#B9529E',
				'40 ~ 50': '#B5479A',
				'50 ~ 60': '#AD3C96',
				'60 ~ 70': '#A93393',
				'70 ~ 80': '#A42D91',
				'80 ~': '#9F238E'
			}
		}
	]
}

colorClass.prototype.hexToRgb = function(hex) {
	
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);     
	return result ? {         
			r: parseInt(result[1], 16),         
			g: parseInt(result[2], 16),         
			b: parseInt(result[3], 16)     
		   } : null; 
}

var colorObj = new colorClass();


/* Graph is the mother of the charts */
var graphClass = function() {
	
	// A place for drawing
	this.pad = null;

	// Define the basic setting for the pad
	this.padHeight = null;
	this.padWidth = null;
	this.padPadding = null;

	// Axes
	this.xAxis = null;
	this.yAxis = null;
}

graphClass.prototype.initializeAPad = function() {

	this.pad = (function() {

		return d3.select('#DATABOARD-vizLayer')
			.append('svg')
			.attr('id', 'SKETCHPAD')
			.style({
				'padding-top':    '5%',
				'padding-left':   '5%',
				'padding-right':  '5%',
				'padding-bottom': '5%'
			})
			.style('height', '100%').style('width', '100%')
			})();

	this.padWidth = 
		parseInt(this.pad.style('width').replace('px', '')),

	this.padHeight = 
		parseInt(this.pad.style('height').replace('px', '')),

	this.padPadding = {
		top:     this.pad.style('padding-top').replace('px', ''),
		bottom:  this.pad.style('padding-bottom').replace('px', ''),
		left:    this.pad.style('padding-left').replace('px', ''),
		right:   this.pad.style('padding-right').replace('px', '')
	}

	return this
}

graphClass.prototype.readCSV = function(path) {
	return d3.csv(path)
}

// To filter the data which are inproper for visualizing.
graphClass.prototype._dataFiltering = function(d, i) {
	
	// Iterate d's object. Once the value is "", deperciate the d.
	for ( var key in d )
		if ( d[key] === "" ) return null
	return d
	// Suspend.
	// for ( var key in d )
		// if ( d[key] === "" ) d[key] = null
	// return d
}

graphClass.prototype._setOrdinalXScale = function(dataset, xLabel) {

	this.xScale = d3.scale.ordinal()
		.domain(
			dataset.map(
				function(d){ return xLabel? d[xLabel]: d }))
		.rangeBands([0, this.chartWidth]);
}

graphClass.prototype._setXAxis = function(pos) {

	if ( typeof pos === 'string' && 
		pos === 'right' || 'left' || 'bottom' || 'top' ) {

		this.xAxis = d3.svg.axis()
			.scale(this.xScale).orient(pos);		
	} 
}

graphClass.prototype._setLinearYScale = function(dataset, dOption) {
	
	this.yScale = d3.scale.linear()
		.domain(
			[0, d3.max(
					dataset, 
					function(d) { return dOption ? parseFloat(d[dOption]): d})
			])
		.rangeRound([this.chartHeight, 0]);

}

// Set the y scale in percentage
graphClass.prototype._setYPctScale = function(dataset, dOption) {
	this.yScale = d3.scale.linear()
		.domain([0, 100]).rangeRound([this.chartHeight, 0]);
}

graphClass.prototype._setYAxis = function(pos, values, specKey) {

	if ( typeof pos === 'string' && 
		pos === 'right' || 'left' || 'bottom' || 'top' ) {

		// Tick divs are used for section the data with tick.
		var tickDiv = null,
				// Transform the tick format
				tickFormater = null;

		var dmax = d3.max(values, function(value) {
			if (specKey)
				return parseInt(value[specKey])
			return parseInt(value)
		});

		// The maximum defines the tick format and the number of ticks.
		if (dmax > 100000) {
			tickDiv = 100000;
			tickFormater = kTick;
		}
		else if (dmax > 10000) {
			tickDiv = 10000;
			tickFormater = kTick;
		}
		else if (dmax < 10000 && dmax > 2000) {
			tickDiv = 1000;
		}
		else if (dmax < 2000 && dmax > 1000) {
			tickDiv = 500;
		}
		else if (dmax < 1000) {
			tickDiv = 200;
		}
		else if (dmax < 100) {
			tickDiv = 10;
		}
		
		this.yAxis = d3.svg.axis()
			.scale(this.yScale).orient(pos)
				.tickValues(d3.range(0, dmax, tickDiv)).tickFormat(tickFormater);
	}

	// Transfer ,000 to K
	function kTick(tick) {
		return Math.round(tick/1e3) + 'K'
	} 
}

// The y axis in percentage.
graphClass.prototype._setYPctAxis = function(pos) {

	if ( typeof pos === 'string' && 
		pos === 'right' || 'left' || 'bottom' || 'top' ) {

		this.yAxis = d3.svg.axis()
			.scale(this.yScale).orient(pos)
				.tickValues(d3.range(0, 100, 20))
					.tickFormat(function(tick) {
						return tick + '%'
					});
	}
}

graphClass.prototype._createXAxis = function(dataset, xLabel, horSpace, step, outPadding) {

	var self = this;

	this.pad
		.append('g')
			.attr('class', 'x-axis')
			.attr('transform', 'translate(0,' + this.chartHeight + ')')
			.call(this.xAxis)
			.call(c_pinLbl2XAxisMidPt, horSpace, step, outPadding)
		.append('text')
			.attr('class', 'axis-name')
			.attr('x', function() {
				return dataset.length*(horSpace+step)+outPadding
			})
			.attr('y', '25')
		.text(xLabel);
}

graphClass.prototype._createYAxis = function(yLabel) {
	this.pad
		.append('g')
			.attr('class', 'y-axis')
			.call(this.yAxis)
		.append('text')
			.attr('class', 'axis-name')
			.attr('transform', 'rotate(90) translate(0, -10)')
			.text(yLabel);
}


graphClass.prototype._removeYAxis = function() {
	this.pad.select('g.y-axis').remove();
}

// update the x label
graphClass.prototype._updateXAxisLabel = function(xLabel) {

	var xAxis = 
		this.pad.select('g.x-axis');

	var xPrevLabel = 
		xAxis.select('text.axis-name');

	if (xPrevLabel.html() !== xLabel) {

		// Store the previous x label's position
		var xLabelAttrs = {
			x: xPrevLabel.attr('x'),
			y: xPrevLabel.attr('y'),
			class: xPrevLabel.attr('class')
		};

		xPrevLabel.remove();

		xAxis.append('text')
			.text(xLabel)
				.attr({
					x: xLabelAttrs.x,
					y: xLabelAttrs.y,
					class: xLabelAttrs.class
				});
	}
}

// update the y label
graphClass.prototype._updateYAxisLabel = function(yLabel) {

	var yAxis = 
		this.pad
			.select('g.y-axis');

	var yPrevLabel =
		yAxis.select('text.axis-name');

	if (yPrevLabel.html() !== yLabel) {
		var yLabelAttrs = {
			transform: yPrevLabel.attr('transform'),
			class: yPrevLabel.attr('class')
		}
	
		yPrevLabel.remove();
	
		yAxis.append('text')
			.text(yLabel)
				.attr({
					transform: yLabelAttrs.transform,
					class: yLabelAttrs.class
				});
	}
}

graphClass.prototype.setOutPadding = function(val) { 
	this.outPadding = val; 
	return this
}

graphClass.prototype.setStep = function(val) { 
	this.step = val;
	return this
}

// Left the horizontal space for each element
graphClass.prototype._setHorSpace = function(dataset, step, outPadding) {
	
	return parseInt((this.chartWidth-outPadding-step*dataset.length) / dataset.length);
}

/* A class for Bar chart */
var barGraphClass = function() {

	graphClass.call(this);

	this.chartHeight = null;
		
	this.chartWidth = null;
	
	// Normal Bars
	this.bars = null;
	this.barsGroup = null;
	this.barWidth = null;
	this.barTxtGroup = null;

	// Stack Bars
	this.stacks  = null;
	this.stackGroup = null;


	this.outPadding = null;

	this.step = null;

	this.xScale = null;
	this.xAxis = null;

	this.yScale = null;
	this.yAxis = null;

}

/* Inherit the barGraphClass from the graph */
barGraphClass.prototype = Object.create(graphClass.prototype);
barGraphClass.prototype.constructor = barGraphClass;

barGraphClass.prototype.setChartSize = function() {
	this.chartHeight = this.padHeight - this.padPadding.top - this.padPadding.bottom;
	this.chartWidth = this.padWidth - this.padPadding.left - this.padPadding.right	;
	return this
}

barGraphClass.prototype.setOutPadding = function(val) { 
	this.outPadding = val; 
	return this
}

barGraphClass.prototype.setStep = function(val) { 
	this.step = val; 
	return this
}

barGraphClass.prototype._setBarWidth = function(dataset) {
	this.barWidth = 
		parseInt((this.chartWidth-this.outPadding-this.step*dataset.length) / dataset.length);
}

barGraphClass.prototype._createBars = function(dataset, dOption, mergedDataset, isInit) {
	
	var self = this;

	// Merged dataset has higher priority.
	var beMergedDataset = mergedDataset.length > 0 ? true : false;
	
	this.barsGroup = 
		this.pad.append('g')
			.attr('class', 'bar-group');

	function binding(data) {
		this.bars = this.barsGroup.selectAll('rect').data(data).enter();
	}

	function render(isInit, eachFn) {

		var updated = 
			this.bars
				.append('rect').classed('bar', true)
					.attr({
						x: function(d, i) {
							return self.outPadding + i * (self.barWidth + self.step)
						}
					});

		var attrs = 
			{
				y: function(d, i) {
					return beMergedDataset ? self.yScale(mergedDataset[i]) : self.yScale(d[dOption])
				},
				width: function(d, i) {
					return self.barWidth
				},
				height: function(d, i) {
					return beMergedDataset ? 
						self.chartHeight - self.yScale(mergedDataset[i]) : 
							self.chartHeight - self.yScale(parseFloat(d[dOption]))
				},
				fill: function(d, i) {
					return colorObj.bar[dOption]
				}
			}

		if (isInit) {
			return updated
				.attr({
					y: self.chartHeight,
					height: 0,
					width :0
				})
				.transition().duration(1000)
					.attr(attrs)
					.each('end', eachFn);
		}
		else 
			updated.attr(attrs).each(eachFn);
	}

	function diffCal(d, i) {

		var _this = d3.select(this);
		
		// Mark the headers that used to merge
		if (beMergedDataset) 
			_this.attr('merged-result', mergedDataset[i]);
		
		// Calculate the differences value for the bar after the first one.
		if (i !== 0) {
				var
					pData = this.previousSibling.__data__,
					diffs = 
						Object.keys(d).map(function(key, i) {
							if ( i !== 0 )
								return { 
									name: key, 
									val: (function() {
										// Check the value is float or integer
										return (d[key] - Math.ceil(d[key]) < 0) ?
												(parseFloat(d[key]) - parseFloat(pData[key])).toFixed(2) :
													parseInt(d[key]) - parseInt(pData[key])
										})()
									}
					}).filter(function(d) { if (d) return d });

		// Attach the variance of each data type.
		for (var j in diffs) 
			_this.attr('diff-'+diffs[j].name, diffs[j].val);
	}
}

	binding.apply(this, [dataset]);
	render.apply(this, [isInit, diffCal]);

	return this
}

/* 
The bar information is the combined information of other sub elements
Stack bars display the users about what the bars are composed of.
*/
/* <Stack Bars> */
/*
	dataset: The data imported from dataset.
	isFullStack : All data in the dataset are used for stack bars creating.
	stackOptions: The data options selected.
*/
barGraphClass.prototype._createStackBars = function(dataset, isFullStack, stackOptions) {

	this.stackGroup = 
		this.pad.append('g')
			.classed('stack-bars-group', true);

	var stacks = this.pad.select('g.stack-bars-group').selectAll('g');
			
	// Binding the dataset to stack bars.
	function bindingStack(data) {
		
		if (stacks[0].length < data.length)
			stacks = stacks.data(data).enter();
		else
			stacks = stacks.data(data).exit().remove();
	}

	function renderStack(data, time) {
		if (stacks[0].length === data.length)
			stacks.append('g')
				.classed('stack', true);
	}

	bindingStack(dataset);
	renderStack(dataset, null);

	// Assign the stacks to barGraph 
	this.stacks = stacks;

	// Create the stack bars.
	this._stackBarProducer(stackOptions);
}

// Update the stack bars if more data features are coming in.
barGraphClass.prototype.updateStackBars = function(yLabel, intl, extl) {

	this._stackBarProducer(intl, extl)
		.then(function(stackbars) {
				stackbars.each(function(d, i) {
					// Reappend the year to the stack bar
					this.__data__.year = this.parentNode.__data__['民國'];
				});
				return new tipClass()
			})
			.then(function(tip){ 
				tip.appendStackBarMouseOver();
				// resolve();
			});
}

// Graph tranform from bar to stack bars.
barGraphClass.prototype.transitBarToStack = function(yLabel, intl, extl) {
	
	// Reselect the origin bar
	this.bars = this.barsGroup.selectAll('rect.bar');
	
	this.stackGroup = 
		this.pad.append('g')
			.classed('stack-bars-group', true);

	var self = this,
			stacks = this.stackGroup.selectAll('g'),
			promised = null;

	// g.stack are used for storing the row data from origin 
	function bindingStack(data) {
		if (stacks[0].length < data.length)
			stacks = stacks.data(data).enter();
		else
			stacks = stacks.data(data).exit().remove();
	}
	function renderStack(data) {
		if (stacks[0].length === data.length)
			stacks.append('g')
				.classed('stack', true);
	}

	// Import the data from external data sheet.
	if (extl.url) {

		// Once the data loading is succeed, return the rows.
		var p_extl = new Promise(function(resolve, reject) {

			self.readCSV(extl.url)
				.row(self._dataFiltering)
				.get(function(errors, rows) {
					resolve(rows);
				});
		});
	}

	var p_intl = new Promise(function(resolve, reject) {

		// Fetch the data from the existed bars.
		var barsData = (function(bars) {

			var data = [];
			
			bars.each(function(d, i) {
				data.push(d);
				if (i === bars[0].length - 1)
					resolve(data);
			});
			return data
		})(self.bars);

	});

	var p_final = new Promise(function(resolve, reject) {

		Promise.all([p_extl, p_intl]).then(function(dataHub) {
		
			var stackData = [];

			// Find the longest data array.
			var len = 0;

			for (var i = 0; i < 2; ++i) {
				if (dataHub[i] && len < dataHub[i].length)
					len = dataHub[i].length;
			}

			// Tranverse the data array according to the longest data length and
			// merge the two results as the data the stack bar needs.
			for (var j = 0; j < len ; ++j) {
	
				var temp = {};
	
				for (var k = 0; k < 2; ++k) 
					if (dataHub[k]) Object.assign(temp, dataHub[k][j])
	
				stackData.push(temp); 
			}
			
			// working-spot-2
			/* update the yScale with the new data. */
			// merged the headers defined 
			var mergedHds = 
				[].concat(extl.headers).concat(intl.headers)
					.filter(function(d) { return d !== null && d !== undefined });
			
			// Find out the maximum values for each stack
			var _mrows = self._mergedColVal(stackData, mergedHds);
			
			self._removeYAxis();
			self._setLinearYScale(_mrows, null);
			self._setYAxis('left', _mrows, null);
			self._createYAxis(yLabel);
			/* The above feature is testing. */

			bindingStack(stackData);
			renderStack(stackData);

			// Remove the bars group and the text group following it.
			self.barsGroup.remove();
			self.barTxtGroup.remove();

			self._stackBarProducer(intl, extl)
				.then(function(stackbars) {
					stackbars.each(function(d, i) {
						// Reappend the year to the stack bar
						this.__data__.year = this.parentNode.__data__['民國'];
					});
					return new tipClass()
				})
				.then(function(tip){ 
					tip.appendStackBarMouseOver();
					resolve();
				});
	});

	});
	return p_final
}

// Create the stack bars
barGraphClass.prototype._stackBarProducer = function(intl, extl) {
	
	this.stacks = this.stackGroup.selectAll('g.stack');
	
	var self = this,
			headers = 
				[].concat(intl.headers, extl.headers)
					.filter(function(d) { 
						return (d !== null && d !== undefined )
					});
	
	var p = new Promise(function(resolve, reject) {

		d3.selectAll('g.stack').each(function(d, stackIndex) {

		// Select the headers chosen for specific purpose.
		if (headers) {

			var barData = [],

				// Calculate the total stacks height
				sumStacksHeight = (function() {
	
					var sum = 0;
					for (var i in headers) 
						sum += parseFloat(d[headers[i]])
					
					return self.chartHeight - self.yScale(sum)
				})();
			
			for (var i in headers) {
				
				var temp = {};
				
				// Set up the name and value of the option
				temp.name = headers[i]
				temp.value = parseFloat(d[headers[i]]);

				// Calculate the stacks' height
				temp.dy = 
					self.chartHeight - self.yScale(temp.value);
				
				// Define the start y for the first stack bar element
				if (parseInt(i) === 0) 
					temp.y0 = self.chartHeight - sumStacksHeight;
				else 
					temp.y0 = barData[parseInt(i) - 1].y0 + barData[parseInt(i) - 1].dy

				barData.push(temp);
			}
		}

		// rects store the original rects before transition.
		var rects = d3.select(this).selectAll('rect'),
				updatedRects = null,
				shouldAppendRects = false;
		
		function binding(data) {
			// if (data.length > updatedRects[0].length) {
			if (data.length > rects[0].length) {
				shouldAppendRects = true;
				updatedRects = rects.data(data).enter();
			}
			else rects.data(data).exit().remove();
			
		}

		function render(time) {
			var initAttrs = {
				x: self.outPadding + stackIndex * (self.barWidth + self.step),
				y: function(d, i) {
					return d.y0
				},
				fill: function(d) {
					return colorObj.bar[d.name]
				},
				width: self.barWidth,
				height: 0
			};

			if (shouldAppendRects) {
				rects
					.attr(initAttrs)
						.transition()
							.duration(time)
								.attr({
									height: function(d, i) {
										return d.dy >= 0 ? d.dy : 0
									}
								});
				updatedRects
					.append('rect').classed('stackbar', true)
						.attr(initAttrs)
						.transition()
							.duration(time)
								.attr({
									height: function(d, i) {
										return d.dy >= 0 ? d.dy : 0
									}
								});
			} 
			else {
				rects
					.attr(initAttrs).transition()
						.duration(time)
							.attr({
								height: function(d) {
									return d.dy >= 0 ? d.dy : 0
								}
							});
			}
		}

		binding(barData);
		render(500);
		
		if (this === this.parentNode.lastChild) 
			resolve(d3.selectAll('rect.stackbar'));
		});

	});

	return p
}

// Transit the bar to percentage stack bar
barGraphClass.prototype.transitBarToPCTStackBar = function(yLabel, intl, extl, mHds) {

	var self = this;

	return this.transitBarToStack(yLabel, intl, extl).then(function() {
		self.transitPCTStackBar(yLabel, mHds);
	})

}

// Transit the stack bar in percentage unit. (PCT = Percent abbr)
barGraphClass.prototype.transitPCTStackBar = function(yLabel, mHds) {

	var self = this;
	
	// Remove the old y axis.
	this._removeYAxis();

	// Create the percentage y scale.
	this._setYPctScale();
	this._setYPctAxis('left');
	this._createYAxis(yLabel);

	// Collect the data from stack bars, the index is the stack
	var dataPairs = [];

	this.stacks.each(function(d, i) {

		// Each pair has several array which contain the data of each stack bar.
		dataPairs[i] = [];
		
		d3.select(this).selectAll('rect').each(function(d, j) {
			dataPairs[i].push({
				year : d.year,
				name : d.name,
				value: d.value,

				// For returning to the quantitive stack bar
				y0: d.y0,
				dy: d.dy
			});
		});
	});
	
	// Update the data pairs with percent value
	dataPairs = dataPairs.map(function(pair) {

		var sum = (function(pair) {
			var temp = 0
			for (var i in pair)
				temp += pair[i].value;
			return temp
		})(pair);

		// Calculate the percentage for each
		for (var j = 0; j < pair.length; j++) {

			var pct = (pair[j].value / sum).toFixed(2);
			
			pair[j].pct = pct;
			
			// The first stack bar starts from y0
			if ( j === 0 )
				pair[j].y0_pct = 0;
			// The begining point for the element are the combined y0 and dy results of the previous 
			else 
				pair[j].y0_pct = pair[j-1].dy_pct + pair[j-1].y0_pct

			// The last stack bar should fill out the left space.
			if ( j === pair.length - 1) {

				pair[j].dy_pct = 
					(function(pairNumber) {
						var sum_dy = 0  
						for (var i = 0; i < pairNumber; i++) 
							sum_dy += pair[i].dy_pct
						return self.chartHeight - sum_dy
						})(j);
			}
			else
				pair[j].dy_pct = self.chartHeight - self.yScale(parseFloat(pct) * 100);
		}
		return pair
	});

	
	var p = new Promise(function(resolve, reject) {

		// Update the rect size
		self.stacks.each(function(d, i) {
			d3.select(this).selectAll('rect')
				.data(dataPairs[i])
					.transition()
						.duration(1000)
						.attr({
							y: function(d, i) {
								return d.y0_pct
							},	
							height: function(d, i){
								return d.dy_pct >= 0 ? d.dy_pct : 0
							}
						})
						.each('end', function(d, i) {
							if (this === this.parentNode.lastChild)
								resolve();
						});
		});

	// Update the rect size
	// this.stacks.each(function(d, i) {
	// 	d3.select(this).selectAll('rect')
	// 		.data(dataPairs[i])
	// 			.transition()
	// 				.duration(1000)
	// 				.attr({
	// 					y: function(d, i) {
	// 						return d.y0_pct
	// 					},
	// 					height: function(d, i){
	// 						return d.dy_pct >= 0 ? d.dy_pct : 0
	// 					}
	// 				});
	});

	return p
}

// Transit the stack bar to origin bar.
barGraphClass.prototype.transitStackBarToBar = function(header, mHdrs, yLabel) {

	var self = this;

	// Grape the data from stack.
	var data = [];

	var p = new Promise(function(resolve, reject) {

		self.stacks.each(function(d, i) {

			data.push(this.__data__);

			// Check if the header is a merged result.
			var isHeaderMerged = self._checkColAccessableInOrigin(data, header),
					// selected headers for the merged.
					// selectedHds = isHeaderMerged ? 
					// 	self._avlHeaders(data, mHdrs) : [],
					selectedHds = isHeaderMerged ? 
						mHdrs : [],
					mergedData	= isHeaderMerged ? 
						self._mergedColVal(data, selectedHds) : [];

			// Collpase the stack bars inside the stack group.
			d3.select(this).selectAll('rect.stackbar')
				.transition().duration(2000)
					.attr({
						y: self.chartHeight,
						height: 0,
						width : 0
					});

			if (this === this.parentNode.lastChild ) {
				self.stackGroup.remove();
				resolve({
					isHeaderMerged: isHeaderMerged,
					mergedData: mergedData
				});
			}
		});
	});

	p.then(function(r) {

		// Remove the old y axis.
		self._removeYAxis();

		// Create the percentage y scale.
		self._setLinearYScale(
			r.mergedData.length > 0 ? r.mergedData : data, 
			r.isHeaderMerged ? null : header
			);

		self._setYAxis(
			'left', 
			r.mergedData.length > 0 ? r.mergedData : data, 
			r.isHeaderMerged ? null : header
			);

		self._createYAxis(yLabel);

		self._createBars(data, header, r.mergedData, false);
		self._markValOnBar(data, header, r.mergedData);
	})
	
	return p
}


/* Switch from percent stack bar to stack bar. */
barGraphClass.prototype.transitPCTSBarToSBar = function(yLabel, intl, extl, isOrigin) {
	
	var self = this,
			headers = 
				intl.headers.concat(extl.headers)
					.filter(function(d, i) { return (d !== null && d !== undefined) });

	// Remove the previous y axis.
	this._removeYAxis();

	// Calculate the total amount of the stack bars
	function stackbarDataSum(d) {
		return d.map(function(_d) {
			var t = 0;
			for ( var i = 0; i < _d.length; ++i )
				t += _d[i].value
			return t
		})
	}

	var p = new Promise(function(resolve, reject) {

		// Store the dataset from the stack bars.
		var dataset = [];

		if (isOrigin) {
			self.stacks.each(function(d, i) {
				dataset[i] = [];
				d3.select(this).selectAll('rect')
					.each(function(d, j) {
					dataset[i].push(d);
				});
			});
			
			// Sum up the value of each stack bar.
			var _dataSum = stackbarDataSum(dataset);

			// Create the linear y scale.
			self._setLinearYScale(_dataSum, null);
			self._setYAxis('left', _dataSum, null); 
			self._createYAxis(yLabel);
	
			// Resize the stack bars.
			self.stacks.each(function(d, i) {
				d3.select(this).selectAll('rect')
					.transition()
						.duration(2000)
							.attr({
								y: function(d, i) {
									return d.y0 
								},
								height: function(d, i) {
									return d.dy >= 0 ? d.dy : 0
								}
							})
							.each('end', function(d, i) {
								if ( this === this.parentNode.lastChild )
									resolve(new tipClass());
							});
			});
		}

		else {
			var dataset = [];

			self.stacks.each(function(d, i) {
				dataset[i] = [];
				for (var j in headers)
					dataset[i].push({
						name : headers[j],
						value: parseFloat(d[headers[j]])
					});
			});
			
			// Combined value of each stack
			var _dataSum = stackbarDataSum(dataset);

			self._setLinearYScale(_dataSum, null);
			self._setYAxis('left', _dataSum, null); 
			self._createYAxis(yLabel);
			self._stackBarProducer(intl, extl).then(function(stackbars) {
				stackbars.each(function(d, i) {
					// Reappend the year to the stack bar
					this.__data__.year = this.parentNode.__data__['民國'];
				});
				return new tipClass()
			})
			.then(function(tip){ 
				tip.appendStackBarMouseOver();
				resolve();
			});
		}
	});

	return p
}

// Transit the percentage stack bar to bar.
barGraphClass.prototype.transitPCTSBarToBar = function(yLabel, dOption, intl, extl, mHdrs) {
	
	// Fetch the rows data from the g.stack
	var rows = [];

	this.stacks.each(function(d, i) {
		rows.push(d);
	});

	this.stackGroup.remove();

	// The option maybe the combined columns of data.
	var shouldMergeCols = this._checkColAccessableInOrigin(rows, dOption);

	// Get the available headers in specific. 
	// var avlHeaders = isdOptionMerged ? this._avlHeaders(rows, mHdrs) : [],
	var _mrows = shouldMergeCols ? this._mergedColVal(rows, mHdrs) : [];
	
	// Set the scale
	this._setLinearYScale(
		_mrows.length > 0 ?
			_mrows : rows, 
		shouldMergeCols ? 
			null : dOption
			);

	this._removeYAxis();

	// Set the Y axis
	this._setYAxis('left', _mrows.length > 0 ? _mrows : rows, shouldMergeCols ? null : dOption);
	this._createYAxis(yLabel);

	// dataset, dOption, mergedDataset, isInit
	this._createBars(rows, dOption, _mrows, true);
	this._markValOnBar(rows, dOption, shouldMergeCols ? _mrows : null);

	return new Promise(function(resolve, reject) { resolve(); })

}

/* </Stack Bars> */

barGraphClass.prototype._markValOnBar = function(dataset, dOption, mergedDataset) {
	
	var self = this;

	// Mergeddataset has higher priority for data rendering 
	var beMergedDataset = mergedDataset.length > 0 ? true : false; 
	
	this.barTxtGroup = 
		this.pad.append('g')
			.attr('id', 'BAR-TXTGROUP');

	this.barTxtGroup
		.selectAll('text')
		.data(dataset)
		.enter()
		.append('text')
			.text(function(d, i) {
				return beMergedDataset ?
					mergedDataset[i] : d[dOption] ? 
						d[dOption] : d
			})
			.attr('class', 'mark')
			.attr('x', function(d, i) {
				return self.outPadding + i*(self.barWidth+self.step)
			})
			.attr('y', function(d, i) {
				return beMergedDataset ?
					self.yScale(mergedDataset[i]) : d[dOption] ? 
						self.yScale(d[dOption]) : self.yScale(d)
			})
			.call(c_placeValOnBarHdV, 10, this.barWidth, this.step, this.outPadding);
}

barGraphClass.prototype.mappingData = function(path, xLabel, yLabel, defaultCol, isStacked, isGrouped, mHdrs) {
	
	var self = this;
	
	var p = new Promise(function(resolve, reject) {
		
		self.readCSV(path)
			.row(self._dataFiltering)
			.get(function(errors, rows) {
				
				// The option maybe the combined columns of data.
				var shouldMergeCols = self._checkColAccessableInOrigin(rows, defaultCol);
				
				// Get the available headers in specific. 
				var	_mrows = shouldMergeCols ? self._mergedColVal(rows, mHdrs) : [];
				self._setBarWidth(rows);

				// Set the scale
				self._setOrdinalXScale(rows, xLabel);
				self._setLinearYScale(
					_mrows.length > 0 ?
						_mrows : rows, 
					shouldMergeCols ? 
						null : defaultCol
						);

				// Set the axes
				self._setYAxis('left', _mrows.length > 0 ? _mrows : rows, shouldMergeCols ? null : defaultCol);
				self._setXAxis('bottom');

				// Draw the axes
				self._createXAxis(rows, xLabel, self.barWidth, self.step, self.outPadding); 
				// There is a bug for y-axis.
				self._createYAxis(yLabel);

				self._createBars(rows, defaultCol, _mrows, true);
				self._markValOnBar(rows, defaultCol, _mrows);

				resolve({
					data: rows,
					pad: self.pad,
					step: self.step,
					barWidth: self.barWidth,
					outPadding: self.outPadding
				});
			});
	});

	return p
}

// working-spot-3: Rename it with a better name
// To check if the selected option is merged results.
barGraphClass.prototype._checkColAccessableInOrigin = function(rowData, opt) {
	if (rowData) {
		var ks = Object.keys(rowData[0]);
		for (var i in ks)
			if (ks[i] === opt) return false
	}
	return true
}

/*
	_mergedColVal function is used once the dOption is not specific or
	it is a combined value that have to be customized with except options.
*/
barGraphClass.prototype._mergedColVal = function (rowData, mergedCols) {
	
	// Rows for max combined value
	return rowData.map(function(row, i) {
					
		var maxVal = 0;

		for (var i in mergedCols)
			maxVal += parseFloat(row[mergedCols[i]])
		return maxVal
	});
				
}

// barGraphClass.prototype.update = function(path, xLabel, yLabel, dOption) {
barGraphClass.prototype.update = function(xLabel, yLabel, dOption) {

	var self = this;

	var p = new Promise(function(resolve, reject) {

				var _bars = self.pad.selectAll('rect'),
						_txts = self.pad.selectAll('.mark'),

					// Former x value of bars for text marker transition.
					f_Pos = (function() {
						var posAry = [];
						for ( var i = 0; i < _bars[0].length; i++ ) {
							posAry.push(
							{
								x: _bars[0][i].getAttribute('x'),
								y: _bars[0][i].getAttribute('y')
							});
					};
					return posAry
				})(),

					// The positions of bars after update
					c_Pos = [];

				// working-spot-2: store the data from the bars
				var data = []; 

				_bars.each(function(d, i) {
					data.push(d);
				});

				self._setLinearYScale(data, dOption);
				self._setYAxis('left', data, dOption);

				// set xy axes' labels.
				self._updateXAxisLabel(xLabel);
				self._updateYAxisLabel(yLabel);

				_bars
					.attr({
						width: function(d, i) {
							return self.barWidth
						}
					})
					.transition()
						.attr({
							y: function(d, i) {

								// get current positions of bars which will use for bar transition animations.
								c_Pos.push(
									{
										x: this.getAttribute('x'),
										y: self.yScale(parseFloat(d[dOption]))
									}
								);
								return c_Pos[i].y
							}, 

							height: function(d) {
								
								return self.chartHeight - self.yScale(parseFloat(d[dOption])) 
							},

							fill :function(d, i) {
								return colorObj.bar[dOption]
							}
						})
					.each(
						'end', 
						function(d, i) {

							// When the last bar is transited, resolve to the next animation.
							if ( i === _bars[0].length - 1) {
								resolve({
									data: data,
									pad: self.pad,
									step: self.step,
									barWidth: self.barWidth,
									outPadding: self.outPadding
								});
							}
					});

				_txts
					.transition()
					/* 
						The text has been rotated about 90 degrees,
						so the text x direction would be vertical.
					*/
					.attr('x', function(d, i) {
						var deltaX = c_Pos[i]['y'] - f_Pos[i]['y'];
						return parseInt(this.getAttribute('x')) + deltaX })
					.text(function(d) { return d[dOption] });

				// Update Y axis
				self.pad
					.selectAll('.y-axis')
					.call(self.yAxis);
		});
	return p
}


barGraphClass.prototype.isInvisible = function() {
	if ( this.bars.style('opacity') ) return true
	else false
}

barGraphClass.prototype.bePhantom = function() {

	this.bars.style('opacity', 0);

	if ( this.isBarHidden() ) 
		this.beDisplayed();
}

barGraphClass.prototype.beVisible = function() {

	this.bars.style('opacity', 1);

	if ( this.isBarHidden() ) 
		this.beDisplayed();
}

barGraphClass.prototype.hide = function() {
	this.bars.style('display', 'none');
}

barGraphClass.prototype.beDisplayed = function() {
	this.bars.style('display', 'inline');
}

barGraphClass.prototype.isBarHidden = function() {

	var displayStatus = this.bars.style('display');
	if ( displayStatus === 'none') return true
	else return false
}

/* Make the x line for the grids */
barGraphClass.prototype._makeXGridLines = function() {

	return d3.svg.axis(this.xScale).orient('bottom')

}
barGraphClass.prototype._makeYGridLines = function() {

	return d3.svg.axis(this.yScale).orient('left')

}

/* Bar chart's grid*/
barGraphClass.prototype.makeGrid = function() {

	this.pad.append('g')
		.attr('class', 'grid')
		.attr('transform', '')
	this.pad.append('g')
		.attr('class', 'grid')
		.attr('transform', '')

}

/* A Line chart class */
var lineGraphClass = function() {

	graphClass.call(this);

	this.pad = null;
	this.padPadding = null;
	this.padHeight = 0;
	this.padWidth = 0;

	this.chartHeight = null;
	this.chartWidth = null;

	this.step = 0;

	this.linePath = null;
	this.lineDots = null;
	this.areaUnderLine = null;

	this.dottedLine = d3.svg.line()
		.x(function(d, i) { return d.cx })
		.y(function(d, i) { return d.cy });

	this.dotSpace = null;

	this.xScale = null;
	this.xAxis = null;

	this.yScale = null;
	this.yAxis = null;

	this.area = null;

	// working-spot-1: Divided areas are used for tensifying the dots graph's trend display affect.
	this.dividedAreas = null;

	// working-spot-1
	// A board of the line graph info
	this.infoBoard = {
		// body: ,
		infoReset: function() {
			// this.info    = [];
			// this.infoIdx = 0;
			// return this
		},

		// Empty all the elemets 
		emptyAll: function() {
			this.body.remove();
			// this.infoReset();
		},
	}
}

/* Inherit the lineGraphClass from the graph */
lineGraphClass.prototype = Object.create(graphClass.prototype);
lineGraphClass.prototype.constructor = lineGraphClass;

lineGraphClass.prototype.setChartSize = function(motherPad) {
	/*
		motherPad = { pad: '', padWidth: '', padHeight: '', padPadding: '' }
	*/
	this.chartHeight = motherPad ? 
		motherPad.padHeight - 
			motherPad.padPadding.top - motherPad.padPadding.bottom :
		this.padHeight - 
			this.padPadding.top - this.padPadding.bottom;

	this.chartWidth = motherPad ? 
		motherPad.padWidth - 
			motherPad.padPadding.left - motherPad.padPadding.right :
		this.padWidth - 
			this.padPadding.left - this.padPadding.right;

	return this
}

// Plot the data from bar graph.
// Debugging
lineGraphClass.prototype.plotBars = function(data, motherPad, bars ,offset, isPinned) {

	var self = this,
		isPinned = isPinned ? true: false;

	var p0 = new Promise(function(resolve, reject) {

		var rects = bars ? 
				bars[0]: motherPad.selectAll('rect')[0],
			// Get hex code of rect elements
			hex = 
				d3.select('#SKETCHPAD').select('rect').attr('fill');

		// Get the all elements' x y position besides the parent
		for (var i = 0; i < rects.length; i++) {

			var box = rects[i].getBBox();

			// Added the dot's position in data
			data[i].dotX = box.x + offset;
			data[i].dotY = box.y ;
		}

		var line = d3.svg.line()
				.x(function(d) { return d.dotX })
				.y(function(d) { return d.dotY });

		// Check if line is existed or not
		if ( self.linePath ) {
			
			self.linePath
				.datum(data)
				.transition()
					.attr('d', line)
					.attr('stroke', colorAdjust(hex, 20));

		// Create a line once it is not existed
		} else {
			
			self.linePath = 
				self.pad
					.append('g')
						.attr('class', 'line-group')
					.append('path')
						.attr('class', 'dotted-path')
					.datum(data)
						.attr('d', line)
						.attr('fill', 'none')
						.attr('stroke', colorAdjust(hex, 20))
						.attr('stroke-width', 3);

		}

		// Check the dots on line are existed or not
		if ( self.lineDots ) {
			
			self.lineDots
				.data(data)
				.transition()
					.attr('fill', colorAdjust(hex, 20))
					.attr('cx', function(d) { return d.dotX })
					.attr('cy', function(d) { return d.dotY });

		// Create the dots once they aren't existed
		} else {
			
			self.lineDots = self.pad
				.append('g')
					.attr('class', 'dots-cluster')
				.selectAll('circle')
				.data(data)
					.enter()
					.append('circle')
						.attr('cx', function(d) { return d.dotX })
						.attr('cy', function(d) { return d.dotY })
						.attr('class', 'dots')
						.attr('fill', colorAdjust(hex, 20))
						.attr('stroke-width', 2)
						.attr('stroke', '#fff')
						.attr('r', 7);
						
		}

		// Check if the unde line area is existed 
		if ( self.areaUnderLine ) {
			self.updateUnderArea(data, colorAdjust(hex, 40));

		// If it is not, then create one.
		} else {
			self.drawUnderArea(data, colorAdjust(hex, 40));
		}

		resolve({ 
			data: data, 
			hexCode: hex, 
			line: self.linePath,
			dots: self.lineDots,
			area: self.areaUnderLine
		});
	});


	return p0
}

// Init info board for displaying detail info
lineGraphClass.prototype.initInfoBoard = function() {

	this.infoBoard = 
		d3.select('#DATABOARD-vizLayer')
			.append('div')
				.attr('id', 'LINE-INFO-BOARD')
				.attr('class', 'board');
}

lineGraphClass.prototype.inheritPad = function(motherPad, padHeight, padWidth, padPadding) {
	
	this.pad = motherPad;
	this.padHeight = padHeight;
	this.padWidth = padWidth;
	this.padPadding = padPadding;	
	return this
}

// Drawing data.
lineGraphClass.prototype.mappingData = function(path, xLabel, yLabel, dOption) {
	
	var self = this;
	
	var p = new Promise(function(resolve, reject) {
		self.readCSV(path)
			.row(self._dataFiltering)
			.get(function(errors, rows) {
	
				self.dotSpace = self._setHorSpace(rows, self.step, self.outPadding);
			
				self._setOrdinalXScale(rows, xLabel);
				self._setLinearYScale(rows, dOption);
	
				// Set the axes
				self._setYAxis('left', rows, dOption);
				self._setXAxis('bottom');

				// Draw the axes
				self._createXAxis(rows, xLabel, self.dotSpace, self.step, self.outPadding); 
				self._createYAxis(yLabel);

				self.lineDots = self.pad
					.append('g')
						.attr('class', 'dots-cluster')
					.selectAll('circle')
						.data(rows)
						.enter()
						.append('circle')
							.attr('cx', function(d, i) { 
								return self.outPadding+(2*i+1)*self.dotSpace/2+i*self.step 
							})
							.attr('cy', function(d, i) { 
								return self.yScale(d[dOption]) 
							})
							.attr({
								r: 7,
								class: 'dots',
								fill: colorAdjust(colorObj.line[dOption], 20),
								stroke: '#fff',
								'stroke-width': 2
							})
							.call(function() {

								var circlePoses = (function(circles) {
									var poses = [];
									for (var i = 0; i < circles[0].length; i++) 
										poses.push({
											cx : parseInt(d3.select(circles[0][i]).attr('cx')),
											cy : parseInt(d3.select(circles[0][i]).attr('cy'))
										});
									return poses
								})(this);

								self.linePath = self.pad.append('g')
									.classed('line-group', true)
										.append('path')
											.datum(circlePoses)
													.attr({
														d: self.dottedLine,
														fill : 'none',
														class: 'line',
														stroke: colorObj.line[dOption],
														'stroke-width': 3
													});
								resolve();
							})
		});
	});
	return p
}

// Line graph update
lineGraphClass.prototype.update = function (path, xLabel, yLabel, dOption) {
	
	var self = this;
	
	var p = new Promise(function(resolve, reject) {
		self.readCSV(path)
			.row(function(d) { return d })
			.get(function(error, rows) {

					self._setLinearYScale(rows, dOption);
					self._setYAxis('left', rows, dOption);

					var circles = 
						self.pad.select('.dots-cluster')
							.selectAll('circle');

					// Bind the data to the circles
					function binding(data) {
						if (data.length >= circles[0].length)
							circles.data(data).enter().append('circle');
						else
							circles.data(data).exit()
					}

					// Render the data
					function render(time) {
						circles
							.transition().duration(time)
								.attr({
									cy: function(d, i) {
										return self.yScale(d[dOption]) 
									},
									fill: function() {
										return colorObj.line[dOption]
									}
								})
								.each(
									'end', 
									function(d, i) {

										// When the last transition is completed,
										// resolve the promise for line path animation.
										if (i === circles[0].length - 1)
											resolve({
												circles: circles[0]
											});
								});
					}

					// Update Y axis
					self.pad
						.selectAll('.y-axis')
						.call(self.yAxis);

					binding(rows);
					render(1000);
				});	
			});

	p.then(function(r) {
						
		var circlePoses = (function(circles) {
				var poses = [];
				for (var i = 0; i < circles.length; i++) 
					poses.push({
						cx : parseInt(d3.select(circles[i]).attr('cx')),
						cy : parseInt(d3.select(circles[i]).attr('cy'))
					});
				return poses
			})(r.circles); 

		self.pad.select('g.line-group').select('path')
			.datum(circlePoses)
				.transition()
				.duration(600)
					.attr({
						d: self.dottedLine,
						stroke: colorObj.line[dOption]
					});
		});
	return p
}

// Fill the area between divide lines and dot line
lineGraphClass.prototype.fillArea = function(data, color) {

	this.area = d3.svg.area()
		.x(function(d) { return d.dotX })
		.y0(this.chartHeight)
		.y1(function(d) { return d.dotY });

	this.pad
		.append('path')
			.datum(data)
				.attr('fill', color)
				.attr('d', this.area);
}

lineGraphClass.prototype.drawUnderArea = function(data, color) {

	this.area = d3.svg.area()
		.x(function(d) { return d.dotX })
		.y0(this.chartHeight)
		.y1(function(d) { return d.dotY });

	this.areaUnderLine = 
		this.pad
			.append('g')
				.attr('class', 'under-line-area-group')
			.append('path')
			.datum(data)
				.attr('class', 'under-line-area')
				.attr('fill', color)
				.attr('d', this.area);
}

lineGraphClass.prototype.updateUnderArea = function(data, color) {

	this.areaUnderLine
		.datum(data)
		.transition()
			.attr('d', this.area)
			.attr('fill', color)
			.style('opacity', 0.8);
}

lineGraphClass.prototype.isInvisible = function() {
	if ( this.linePath.style('opacity') ) return true
	else false
}

lineGraphClass.prototype.hide = function() {
	this.linePath.style('display', 'none');
	this.lineDots.style('display', 'none');
	return this
}

lineGraphClass.prototype.beDisplayed = function() {
	this.linePath.style('display', 'inline');
	this.lineDots.style('display', 'inline');
	return this
}

lineGraphClass.prototype.isLineHidden = function() {

	var displayStatus = 
			this.linePath.style('display');

	if ( displayStatus === 'none') return true
	else return false
}

lineGraphClass.prototype.displayUnderArea = function() {
	this.areaUnderLine.style('display', 'inline');
	return this
}

lineGraphClass.prototype.hideUnderArea = function() {
	this.areaUnderLine.style('display', 'none');
	return this
}

lineGraphClass.prototype.empty = function() {

	this.linePath = null
	this.lineDots = null
	this.areaUnderLine = null

	return this
}

// Draw the markers on the graph.
lineGraphClass.prototype.drawEvtMarkers = function() {

	var url   = 'https://spreadsheets.google.com/tq?key=',
			key   = '1jAMtUHVlw_pqmlnyFrscqwy274CgmQQ9C0Kp3EXmoAY',
			query = '&tqx=out:csv';

	var self = this,
			dots = 
				this.lineDots[0].filter(function(obj) {
					if (obj.tagName === 'circle')
						return obj
				});

	this.readCSV(url+key+query)
		.row(function(d, i) { if (i !== 0) return d })
		.get(function(error, rows) {

			// Some special judicial events happens on
			var years = rows.map(function(d) { return d["民國"] });
			
			// Filter the dots with the specific years
			var dotsData = dots.map(function(dot) { 
					for ( var j in years ) 
						if (dot.__data__["民國"] === years[j]) 
							return dot.__data__
					}).filter(function(data) {
						if (data) return data
					});

			// Working-spot-1:
			(function() {

				for (var i in dots) {

					// Get the rows 
					var r = rows.find(function(row) { 
							try {
								dots[i].__data__['民國'];
							} catch(e) {
								if (e instanceof TypeError) return null
							} 
							return row['民國'] === dots[i].__data__['民國']
						});
					
					if (r) {
						// Attach the judicial events
						dots[i].__data__['司法事記'] = r['司法事記'];
						dots[i].__data__.tag = r['tag'];
						dots[i].__data__.hasEvent = true;
					} else {
						dots[i].__data__.hasEvent = false;
						dots[i].__data__.tag = '';
					}
						
				}
			})();

			// The end point of each lines.
			var xAxisYPos = self.pad.select('g.x-axis')
				.attr('transform').match(/\d+\.\d+/g);	

			// working-spot-1: attach the line on the dots with the event connection.
			self.pad.append('g')
				.attr('class', 'evt-marker-lines')
					.selectAll('line')
						.data(dotsData).enter()
						.append('line')
							// .attr('x1', function(d) { return d.dotX }) // Default setting
							// .attr('y1', function(d) { return d.dotY })
							// .attr('x2', function(d) { return d.dotX })
							// .attr('y2', function(d) { return parseInt(xAxisYPos)})
							.attr('x1', function(d) { return d.dotX }) // Default setting
							.attr('y1', function(d) { return d.dotY })
							.attr('x2', function(d) { return d.dotX })
							.attr('y2', function(d) { 
								if (d.dotY-50 < 30)
									return d.dotY+50
								return d.dotY-50
							})
							// .attr('stroke', 'black')
							.attr('stroke', '#333')
							.attr('stroke-width', 1)
							// .attr('stroke-dasharray', "5, 5, 1, 5") // Default style setting
							.each(function(d, i) { // Append the tag info on the line
								
								var _this = d3.select(this);
								
								if (i === 0)
									self.pad.append('g').attr('class', 'evt-marker-names');

								// Attach the text to the lines as integrating into a marker.
								this.__data__.text =
									self.pad.select('g.evt-marker-names')
										.append('text')
											.attr('x', _this.attr('x2'))
											.attr('y', _this.attr('y2'))
												.text(_this.node().__data__.tag)
													.attr('fill', '#08f');
							})
							.call(function() {
								
								var lines = 
									this[0].filter(function(o) { 
										if (o.tagName === 'line') 
											return o
									});
								
								// Binding markers to the dots
								for (var i in dots) {
									if (dots[i].__data__.hasEvent)
										dots[i].__data__.line = d3.select(lines.shift());
								}
							});

		});

}


lineGraphClass.prototype.isEvtMarkersExisted = function() {
	return this.pad.select('g.evt-marker-lines').empty()
}

// Remove the event markers
lineGraphClass.prototype.emptyEvtMarkers = function() {
	this.pad.select('g.evt-marker-lines').remove();
	this.pad.select('g.evt-marker-names').remove();
}

// working-spot-1
lineGraphClass.prototype.updateEvtMarkers = function() {

	d3.select('g.evt-marker-lines').selectAll('line')
		.transition()
			.duration(200)
				.attr('x1', function(d) { return d.dotX }) 
				.attr('y1', function(d) { return d.dotY })
				.attr('x2', function(d) { return d.dotX })
				.attr('y2', function(d) { 
					if (d.dotY-50 < 30)
						return d.dotY+50
					return d.dotY-50
				});

	// d3.select('.dots-cluster').selectAll('.dots').each(function(d) {
	// 	console.log(d);
	// 	// var line = this.__data__.line;
		
	// 	// if (!line) {
	// 	// 	line.transition()
	// 	// 		.duration(200)
	// 	// 			.attr('x1', function(d) { return d.dotX }) 
	// 	// 			.attr('y1', function(d) { return d.dotY })
	// 	// 			.attr('x2', function(d) { return d.dotX })
	// 	// 			.attr('y2', function(d) { 
	// 	// 				if (d.dotY-50 < 30)
	// 	// 					return d.dotY+50
	// 	// 				return d.dotY-50
	// 	// 			});
	// 	// }
	// });
	
}

/* A Class for ring chart */
var ringGraphClass = function() {
	
	var self = this;

	// Import ring graphClass into Graph Class
	graphClass.call(this);

	// Core radius of the ring sequence
	this.coreRadius = 100;

	// The drawing ring inner radius 
	this.ringInnerRadius = this.coreRadius;

	// Delta of the ring radius
	this.ringDelta = 0;

	// The gap between each ring
	this.ringGap = 2;

	// Ring Group for collecting ring Objects
	this.ringGroup = [];

	// A variable for storing Year value in ROC
	this.rocYr = null;

	this.dataInfoView = {
		textArea: null,
		percentage: null,
		categoryName: null,
		itemName: null,
		itemNumber: null
	};

	// A ring info board for displaying the chart detail.
	this.ringInfoBoard = { // Use for displaying the quantitive of each parts
		statsBoard     : {
			body : null,
			scale: null,
			info : [],
			infoIdx: 0,

			infoReset: function() {
				this.info    = [];
				this.infoIdx = 0;
				return this
			},

			// Empty all the elemets 
			emptyAll: function() {
				this.body.remove();
				this.scale = null
				this.infoReset();
			},

			setScale: function() {

				var boardWidth = 
					parseInt(this.body
						.style('width').replace('px', ''));

				this.scale = d3.scale.linear()
					.domain(
						[0, d3.max(
								this.info[this.infoIdx].values,
								function(d) { return d.value })
						])
					.rangeRound([0, boardWidth * .5]);
			},

			// store the info
			storeInfo: function(titleName, idName, objs) {

				var l = objs.length,
					infoData = {
						name   : titleName,
						ringId : idName,
						year   : null,
						values : []
					};

				for (var i = 0; i < l; ++i) {
					// Access the information from root
					if (parseInt(i) === 0)
						infoData.year = objs[i].__data__.name;
					else 
						infoData.values.push({
							name : objs[i].__data__.name,
							value: objs[i].__data__.value
						});
				}

				this.info.push(infoData);

			},

			// the the stats board do the animation after the data updated
			update: function() {

				var 
					board = this,
					data  = this.info[this.infoIdx],
					menu  = board.body.select('#'+data.ringId+'-menu'),
					svg   = menu.select('svg');

				// Reset the scale with new data for a proper view
				board.setScale();

				// Remove the text which show the older bars data
				menu.selectAll('svg > text').remove();

				menu.selectAll('rect')
						.each(function(d, i) {
							// Update the data for each bar
							this.__data__ = data.values[i];
						})
						.call(function() {
							
								// Draw the updated results
								this.transition()
									.duration(600)
									.attr('width', function(d, i) {
										return board.scale(d.value)
									})
									.each('end', function() {
										board._markValText.call(
											this, 
											{ svg: svg });
									});
						});
				},

				// mark the data value after the bars and shift the text to correct positions.
				_markValText: function() {
						var 
							svg  = arguments[0].svg,
							rect = d3.select(this),
							rectD = this.__data__,
							rectW = parseInt(rect.attr('width').replace('px', '')),
							rectX = parseInt(rect.attr('x')),
							rectY = parseInt(rect.attr('y'));

						svg
							.append('text')
								.text(rectD.value)
								.style('font-size', '0.8em')
								.attr('x', rectX + rectW + 5)
								.attr('y', rectY + 12)
								.attr('fill', '#fff');

						// Set the svg size after the last bar is rendered when the board is first rendered.
						if (arguments[0].isInit && arguments[0].isLast) 
							svg.attr('default-height', rectY + 30);
				},
		}, 
		percentageBoard: { // Use for displaying the percentage of the part.
			body: null,
			
			emptyAll: function() {
				this.body.remove();
			},

			calVal: function(val) {
				var val = 
					val * 100 > 0.0999999999 ? 
						(val * 100).toFixed(1) : 
						'<span style="font-size: 0.4em;">&lt;</span> 0.1';
				
				this.body.select('.board-body-txt').html(val);
				return this;
			},
			
			setTitle: function(topic, category) {

				this.body.select('.board-body-title')
					.text(topic + ':' + category);

				return this;
			}
		}
	}
}

/* Inherit the ringGraphClass from the graph */
ringGraphClass.prototype = Object.create(graphClass.prototype);
ringGraphClass.prototype.constructor = ringGraphClass;

ringGraphClass.prototype.init = function() {

	// Initial an outer Radius of the ring sequence
	this.shellRadius = (function(h, w) { 
		return Math.min(h,w)/ 2 
	})(
		this.padWidth - this.padPadding.left, 
		this.padHeight - this.padPadding.top
	);

	// Initial the board for stats
	this.ringInfoBoard.statsBoard.body =  
		d3.select('#DATABOARD-vizLayer').append('div')
			.classed('board', true)
			.attr('id', 'RING_STATS_BOARD')
			.style('top', '7%')
			.style('left', '7%');

	// Initial the board for pecentage
	this.ringInfoBoard.percentageBoard.body = 
		d3.select('#DATABOARD-vizLayer').append('div')
			.classed('board', true)
			.attr('id', 'RING_PERCENTAGE_BOARD')
			.style('bottom', '5%')
			.style('left', '7%');

	this.ringInfoBoard.percentageBoard.body
		.append('section')
			.attr('class', 'board-body board-body--centering')
			.style('height', '100%')
			.call(function() {
				this.append('div').attr('class', 'board-body-title');
				this.append('div').attr('class', 'board-body-txt');
			});
		
	return this
}

// A constructor for creating the rings for ring chart
ringGraphClass.prototype.ringConstructor = function(idName, source, innerR, outerR) {

	var ring = function(idName, iR, oR, s) {

		// Let d3js select element easier.
		this.idName = idName;

		// Set the source of the data
		this.dataSource = s;

		// Define the basic of the ring
		this.outerRadius = oR;
		this.innerRadius = iR;

		// Define the way we dipict the ring
		this.partition = 
			d3.layout.partition()
				.sort(null)
					.size([ 2*Math.PI, this.outerRadius*this.outerRadius ])
					.value(function(d) { return d.value });

		this.arc =
			d3.svg.arc()
				.startAngle(function(d) { return d.x })
				.endAngle(function(d) { return d.x + d.dx })
				.innerRadius(this.innerRadius)
				.outerRadius(this.outerRadius);

		// Stores the position of the path of ring after rendering
		this.pathOriginPos = [];

		};

	var r = new ring(idName ,innerR, outerR, source);

	return r
}

// working spot-2: Trying to depart it into several modules.
ringGraphClass.prototype._infoBoardRender = function(isUpdate) {
	
	var 
		self = this,
		statsBoard = this.ringInfoBoard.statsBoard,

		info  = statsBoard.info,
		index = statsBoard.infoIdx,

		isUpdate = isUpdate ? true : false,

		boardWidth = 
			parseInt(statsBoard.body.style('width').replace('px', '')),

		// Load Color settings for current ring data from the color object.
		colorSettings = 
			colorObj.rings.find(function(d) {
				if (d.name === info[index].name) 
					return true
			});

	statsBoard.setScale();

	if (!isUpdate) {
		statsBoard.body
			.append('div')
				.attr('id', info[index].ringId + '-menu')
				.attr('class', 'board-dropdown')
				.html(function(){
					return (
						'<div class="board-dropdown-header">'
						+ '<span class="title">' 
						+ info[index].name 
						+ '</span>'
						+ '<span class="arrow">'
						+ '<div class="arrow-left"></div>'
						+ '<div class="arrow-right"></div>'
						+ '</span>'
						+ '</div>'
					)
				})
				.selectAll('div.board-dropdown')
					.data([info[index]])
					.enter()
					.append('div')
					.attr('class', 'board-dropdown-menu')
					.append('svg')
						.selectAll('g')
						.data(info[index].values)
						.enter()
						.append('g')
						.append('text')
							.text(function(d) {
								return d.name
							})
							.attr('x', 0)
							.attr('y', function(d, i) {
								return 22.5 + 25 * (i > 0 ? i : 0) + 'px'
							})
							.attr('font-size', '0.8em')
							.attr('fill', '#fff')
						.call(function(textObjs) {

							// Find the max width of text and set it as the bars' offset x.
							var barXOffset = 
								(function(d) {
									
									var textWidths = [],
										dL = d.length;

									for (var i = 0; i < dL; ++i) 
										textWidths.push(
											parseInt(
												d3.select(d[i]).style('width')
													.replace('px', '')
											));
									
									return Math.max.apply(null, textWidths)

								})(textObjs[0]);

							var svg = statsBoard.body.select('#'+info[index].ringId+'-menu svg');

							// Draw the bars
							svg
								.selectAll('rect')
								.data(info[index].values)
								.enter()
								.append('rect')
									.attr('height', 15)
									.attr('width', function(d, i) {
										return statsBoard.scale(d.value)
									})
									.attr('default-color', function(d) {
										return colorSettings.value[d.name]
									})
									.attr('fill', function(d) {
										return colorSettings.value[d.name]
									})
									.attr('x', function(d, i) {
										var paddingBefore = 20;
										return 10 + barXOffset + 'px'
									})
									.attr('y', function(d, i) {
										return 10 + 25 * (i > 0 ? i : 0) + 'px'
									})
									// Mark the number after the bars
									.call(function(rectObjs) {

										var 
											rects = rectObjs[0],
											rectsNumber = rects.length;
										
										for ( var i = 0; i < rectsNumber; i++ ) {

											if (i === rectsNumber-1) 
												statsBoard._markValText.call(
													rects[i], 
													{ 
														svg: svg, 
														isInit: true, 
														isLast: true 
													}
											);
											else
												statsBoard._markValText.call(
												rects[i], 
													{ 
														svg: svg, 
														isInit: true,
													}
												);
										}

										// Let the most outer ring's menu be displayed
										// Suspend issue.
										if ( info[index].ringId === 'RING_3' ) {

											statsBoard.body
												.attr('current-ring-data', 'RING_3');

											svg
												.attr('height', function() {
													this.getAttribute('default-height');
													return this.getAttribute('default-height') + 'px'
												});
										}
										else {

											svg.attr('height', 0);

											d3.select('#'+info[index].ringId+'-menu')
												.style('display', 'none');
										}
								});
						});

	// If the dropdown menus are exist, redraw the bars and update the texts.
	} else {
		
		var ringData = statsBoard.info[statsBoard.infoIdx];
		statsBoard.update();
	}

	statsBoard.infoIdx += 1;
}

ringGraphClass.prototype.calRadiusDelta = function(categoryNum) {

	this.ringDelta = 
		(this.shellRadius - 
		 	this.coreRadius - 
		 		(categoryNum - 1) * this.ringGap) / categoryNum;

}

/* Select the year in ROC */
ringGraphClass.prototype.selectROCYr = function(yr) {

	var date = new Date();

	// The data of current year won't be published until the next year
	this.rocYr = ( yr >= 75 && (date.getFullYear()-1911-1) > yr ) ? yr : null;
	return this
}

/* Row Index of data of ROC year */
ringGraphClass.prototype.selectRow = function() {
	if ( this.rocYr ) return this.rocYr-75
	else return null
}

ringGraphClass.prototype.drawRing = function(ringObj) {

	var self = this,
		isYrSelected = this.rocYr ? true: false,
		keywords = ringObj.dataSource.name;
	
	this.readCSV(ringObj.dataSource.url)
		.row(function(d, i) {
			if ( isYrSelected ) if ( i === self.selectRow() ) return d
			else return null
		})
		.get(function(err, selectedRows) {

			var selectedRow = 
					selectedRows.length === 1 ? 
						selectedRows[0]: null;
			
			var total = (function(vals) {

				var sum = 0;
				for (var i in vals) 
					sum += parseInt(vals[i]);

				return sum
					
			})(selectedRow);

			if (selectedRow) {

				selectedRow.pop = jsonPop;
				selectedRow = transtoPartitonFormat(selectedRow, '民國');

				self.pad.append('g')
					.attr('id', ringObj.idName)
					.attr('class', 'RING')
					.attr('transform', function() {

						// Put the ring at the center of the pad
						return 'translate(' + 
							(
								self.padWidth / 9 * 6 - 
								self.padPadding.left
							)
							+ ',' + 
							(
								self.padHeight / 2 -
								self.padPadding.top							
							) 
							+ ')'
					})
					.style('stroke', '#fff')
					.style('opacity', 0.6)
					.on('mouseenter', function(d, i) {

						self.ringInfoBoard.statsBoard.body
							.attr('current-ring-data', this.id);
						
						__menuAnimation(this.id, "expand");
						
					})
					.on('mouseleave', function(d, i) {
						
						__menuAnimation(this.id, "collapse");

					})
					.datum(selectedRow)
						.selectAll('path')
							.data(ringObj.partition.nodes)
							.enter()
							.append('path')
								.attr('d', ringObj.arc)

							// Store the data and initialize the info board.
							.call(function(d) {
								self.ringInfoBoard.statsBoard.storeInfo(keywords, ringObj.idName, d[0]);
								self._infoBoardRender();
							})
							.style('fill', function(d, i) {
								var cIndex = colorObj.rings
									.findIndex(function(o) {
										if ( o.name === keywords ) return true
								});
								return colorObj.rings[cIndex].value[d.name]
							})
							.style('fill-rule', 'evenodd')
							.on('mouseenter',function(d, index) {

								d3.select('#'+this.parentNode.id+'-menu')
									.selectAll('rect')
									.each(function(d, i) {
										if ( index === i + 1)
											d3.select(this).classed('selected', true);
									});

								d3.select(this)
									.attr('stroke-width', '5px')
									.attr('stroke', '#fff');

								// Render the percentage number to the percentage board
								self.ringInfoBoard.percentageBoard
									.calVal(d.value/total)
									.setTitle(keywords, d.name);

							})
							.on('mouseout' ,function(d, index) {

								d3.select('#'+this.parentNode.id+'-menu')
									.select('rect.selected')
									.classed('selected', false);
								
								d3.select(this)
									.attr('stroke-width', null)
									.attr('stroke', null);

							})
							.call(function(pathCluster) {
								ringObj.pathOriginPos = 
									self._stashOriginPathPos(pathCluster[0]);
							});
		}
		
		function __menuAnimation(ringId, evtName) {
			
			var 
				ringNumber =
					self.ringInfoBoard.statsBoard.info.length,

				innerRingId =
					self.ringInfoBoard.statsBoard.info[0].ringId,

				outerRingId =
					self.ringInfoBoard.statsBoard.info[ringNumber-1].ringId,

				ring =
					d3.select('#'+ringId).node(),

				dropdownMenu = 
					d3.select('#'+ringId+'-menu'),

				dropdownSVG = 
					dropdownMenu
						.select('div.board-dropdown-menu')
						.select('svg'),

				dropdownArrow = 
					dropdownMenu
						.select('div.board-dropdown-header')
						.select('span.arrow'),
				
				innerDropdownMenu  = 
					d3.select('#'+innerRingId+'-menu'),
				innerDropdownSvg   = 
					innerDropdownMenu
						.select('div.board-dropdown-menu').select('svg'),
				innerDropdownArrow = 
					innerDropdownMenu
						.select('div.board-dropdown-header').select('span.arrow'),

				outerDropdownMenu  = 
					d3.select('#'+outerRingId+'-menu'),
				outerDropdownSvg   = 
					outerDropdownMenu
						.select('div.board-dropdown-menu').select('svg'),
				outerDropdownArrow = 
					outerDropdownMenu
						.select('div.board-dropdown-header').select('span.arrow');

				if ( evtName === "expand" ) {

					$v(
						ring,
						{ opacity : 1.0 },
						{ duration: 400 }
					);

					if ( ringId !== outerRingId && ringId !== innerRingId ) {
						
						if ( innerDropdownMenu.style('display') === 'block' ) {
							__collapseMenu(
								innerDropdownMenu,
								innerDropdownSvg ,
								innerDropdownArrow
								);
						} else if ( outerDropdownMenu.style('display') === 'block' ) {
							__collapseMenu(
								outerDropdownMenu,
								outerDropdownSvg ,
								outerDropdownArrow
								);
						}
						__expandMenu(
							dropdownMenu, 
							dropdownSVG , 
							dropdownArrow
						);
					} else if (ringId === outerRingId) {
						__expandMenu(
							dropdownMenu, 
							dropdownSVG , 
							dropdownArrow
						);
					} else if (ringId === innerRingId) {
						__expandMenu(
							dropdownMenu, 
							dropdownSVG , 
							dropdownArrow
						);
					}
				} else if ( evtName === "collapse") {

					$v(
						ring,
						{ opacity : 0.6 },
						{ duration: 400 }
					);

					if ( ringId !== outerRingId && ringId !== innerRingId ) {
						__collapseMenu(
							dropdownMenu, 
							dropdownSVG, 
							dropdownArrow
						);
					}
				}

			function __expandMenu(menu, svg, arrow) {

				menu
					.style('display', 'block');

				$v(
					svg.node(),
					{ height  : svg.attr('default-height')},
					{ duration: 400 }
				);

				$v(
					arrow.node(), 
					{ rotateZ : '180deg' }, 
					{ duration: 400 }
				);
			}

			function __collapseMenu(menu, svg, arrow) {

				menu.style('display', 'none');

				$v(
					svg.node(),
					{ height  : 0   },
					{ duration: 400 }
				);

				$v(
					arrow.node(),
					{ rotateZ : '0deg' },
					{ duration: 400 }
				);
			}
		}
	});
}

ringGraphClass.prototype.drawMultiRings = function(paths) {

	var self = this,
		l = paths.length,
		_rings = [];

	this.calRadiusDelta(l);
	
	for ( var i = 0; i < l; i++ ) {
				
		_rings.push({

			idName:
				'RING_' + i,

			path:
				paths[i],

			innerRadius: 
				this.coreRadius + 
					(i-1) * this.ringGap + 
						(i-1) * this.ringDelta, 

			outerRadius: 
				this.coreRadius + 
					(i-1) * this.ringGap + 
						i * this.ringDelta
		});
	}

	var _rings_l = _rings.length;

	for (var j = 0; j < _rings_l; ++j) {
		
		var r = _rings.shift();
				
		this.ringGroup.push(
			this.ringConstructor(
				r.idName,
				r.path, 
				r.innerRadius, 
				r.outerRadius));
	}

	for (var k = 0; k < this.ringGroup.length; ++k) 
		this.drawRing(this.ringGroup[k]);
}	

ringGraphClass.prototype.updateRings = function() {

	for (var r of this.ringGroup) 
		this.updateRing(r);
}

ringGraphClass.prototype.updateRing = function(ringObj) {
	
	var self = this,
		rowNumber = this.selectRow(),
		isYrSelected = this.rocYr ? true: false,
		keywords = ringObj.dataSource.name;

	this.readCSV(ringObj.dataSource.url)
		.row(function(d, i) {
			if ( isYrSelected ) if ( i === rowNumber ) return d
			else return null
		})
		.get(function(err, selectedRows) {
			var selectedRow = 
					selectedRows.length === 1 ? 
						selectedRows[0]: null;
					
			if (selectedRow) {

				selectedRow.pop = jsonPop;
				selectedRow = transtoPartitonFormat(selectedRow, '民國');
				
				d3.select('#'+ringObj.idName).datum(selectedRow)
					.selectAll('path').data(ringObj.partition.nodes)
					.each(function(d, i) {
						if (i !== 0 && i <= ringObj.pathOriginPos.length) {
      						d.x0  = ringObj.pathOriginPos[i-1].x0; 
      						d.dx0 = ringObj.pathOriginPos[i-1].dx0;
      					}
					})
					// Reset the statsboard for updating.
					.call(function(d) {

						if (ringObj.idName == 'RING_0') // Clear the old data when running into the first ring.
							self.ringInfoBoard.statsBoard
								.infoReset().storeInfo(keywords[0], ringObj.idName, d[0]);
						else
							self.ringInfoBoard.statsBoard
								.storeInfo(keywords[0], ringObj.idName, d[0]);

						self._infoBoardRender(true);
					})
					.transition()
						.duration(500)
						.call(function() {

							var arcsData = 
								this[0].map(function(arc, i) { // Arcs are bounding with data
									if ( i > 0 ) // i == 0 is the total.
										return {
											name : arc.__data__.name, 
											value: arc.__data__.value
										}
								}).filter(function(e){ if (e) return e }),

									ringNode = d3.select(this.node().parentNode);

							// The ring will flash when the transition happens and flashout after the animation.
							ringNode
								.transition()
									.duration(500)
										.style('opacity', 1.0)
								.transition()
									.duration(1000)
										.style('opacity', 0.6);

						})
						.attrTween(
							'd',
							function(d, i, a) {
								if ( i > 0 ) {
      							
								var itp = d3.interpolate({x: d.x0, dx: d.dx0}, d);

								// Step function for interpolation
								return function(t) {
	  				
									var b = itp(t);
									d.x0 = b.x;
									d.dx0 = b.dx;
									return ringObj.arc(b)
								};
						    }	
							}
						)
					// Stores the updated position 
					.call(function(pathCluster) {
						ringObj.pathOriginPos =
							self._stashOriginPathPos(pathCluster[0]);
					});
			}
		});
}

ringGraphClass.prototype._stashOriginPathPos = function(paths) {
	
	var originPoses = [];

	for (var i in paths)
		if (parseInt(i) > 0) 
			originPoses.push({
				x0 : paths[i].__data__.x, 
				dx0: paths[i].__data__.dx
		});
	return originPoses
}

// Clear previos ring graph for updating.
ringGraphClass.prototype.resetRings = function() {
	this.ringGroup = []
	return this
}

// remove the boards if they exist
ringGraphClass.prototype.removeBoards = function() {
	var statsBoard = this.ringInfoBoard.statsBoard,
			percentageBoard = this.ringInfoBoard.percentageBoard;
	if (statsBoard.body) 
		statsBoard.emptyAll();
	if (percentageBoard.body)
		percentageBoard.emptyAll();
}

/* A class for tooltip */
var tipClass = function() {

	var panel = d3.select('#APP');
	
	this.dotTip = panel ? 
		panel.append('div')
			.attr('id', 'DOT-TIP')
			.attr('class', 'tip') : undefined;

	this.barTip = panel ? 
		panel.append('div')
			.attr('id', 'BAR-TIP')
			.attr('class', 'tip') : undefined;

	/* These varaibles are designed for preventing any kinds of exceptional value of the node */
	// The below two record the size value of tip and are used for checking the elements' resize.
	this._bTipH = null;
	this._bTipW = null;

}

tipClass.prototype.initTips = function() {
	this.dotTip = 
		d3.select('#APP')
			.append('div')
				.attr('id', 'DOT-TIP').attr('class', 'tip'); 
	this.barTip = 
		d3.select('#APP')
			.append('div')
				.attr('id', 'BAR-TIP').attr('class', 'tip');
	return this 
}

tipClass.prototype.appendDotMouseOver = function(dOption) {

	var self = this,

		// Set up the origin of the dot tip
		offset = this._setOffset('DOT-TIP');

		d3.select('#SKETCHPAD')
			.selectAll('.dots')
			.on(
				'mouseover', 
				function(d) {
					
					var posX = parseInt(this.getAttribute('cx')),
						posY = parseInt(this.getAttribute('cy'));
	
					self.dotTip
						.classed('display', true)

						// Make the tip's origin fixed at center of circles
						.style('top', posY + offset.Y + 'px')
						.style('left', posX +offset.X + 'px')
						.html(function() {

							// Display the specific events on dot chart.
							var info = 
								'民國 ' + d['民國'] + '<br>' +
							   		dOption + ': ' + d[dOption];
							// working-spot-1
							// Bug: Only the last dot does not display correctly, I will fix it later.
							// if (d.tag.length == 0) 
							// 	return '<span id="DOT-INFO">' + info + '</span>'
							// else {
							// 	return '<span id="DOT-INFO">' + info + '</span>' +
							// 				 '<span class="tag">' + d.tag + '</span>'
							// }
							return '<span id="DOT-INFO">' + info + '</span>'

						})
						.call(function(d) {
							self._correctPos('DOT-TIP');
						});
			})
			.on(
				'mouseout',
				function(d) {
					self.dotTip
						.classed('display', false);
				}
			);
}

tipClass.prototype.appendBarMouseOver = function(dOption) {

	var self = this,
		// Set up the origin of the bar tip
		offset = this._setOffset('BAR-TIP');

	d3.select('#SKETCHPAD')
		.selectAll('.bar')
		.on(
			'mouseenter', 
			function(d) {
				
				var 
					_this = d3.select(this),
					prevBar = this.previousSibling,
					diff = (function(name){
						var r = _this.attr('diff-'+name);
						if(r) return r 
					})(dOption);

				var 
					posX = 
						parseFloat(this.getAttribute('x')) + 
						parseFloat(this.getAttribute('width')/2),
					posY = 
						parseFloat(this.getAttribute('y'));

				self.barTip
					.classed('display', true)

					// Make the tip's origin fixed at center of circles
					.style('top' , posY + offset.Y + 'px')
					.style('left', posX + offset.X + 'px')

					.html(function() {

						// Check the current display data is a merged result or not.
						var keys = Object.keys(d),
								isMergedResult = !(dOption in keys);

						var info = 
							'民國 ' + d['民國'] + '<br>' +
						   		dOption + ': ' + 
						   			// Render the merged result if it is.
						   			(isMergedResult ? _this.attr('merged-result') : d[dOption]);

						if (diff) {
							if (diff < 0) 
								return '<span id="BAR-INFO">' + info + '</span>' + 
											 '<span>較去年同期：</span>' +
											 '<span><span class="down-arrow align">' + '</span>' + 
											 '<span class="align">&nbsp;'+ diff + '</span></span>'
							else (diff > 0)
								return '<span id="BAR-INFO">' + info + '</span>' + 
											 '<span>較去年同期：</span>' +
											 '<span><span class="up-arrow align">' + '</span>' + 
											 '<span class="align">&nbsp;'+ diff + '</span></span>'
						} else if (diff === undefined && isMergedResult) {

							if (prevBar) {

								diff = 
									parseInt(_this.attr('merged-result')) - 
										parseInt(d3.select(prevBar).attr('merged-result'));

								return '<span id="BAR-INFO">' + info + '</span>' + 
											 '<span>較去年同期：</span>' +
											 '<span><span class="up-arrow align">' + '</span>' + 
											 '<span class="align">&nbsp;'+ diff + '</span></span>'
							}
							return '<span id="BAR-INFO">' + info + '</span>'
						}
						else
							return '<span id="BAR-INFO">' + info + '</span>'
					})
					.call(function(d) {
						self._correctPos('BAR-TIP')
							._nodeSizeCorrect('BAR-TIP');
					});
			})
		.on(
			'mouseout',
			function(d) {
				self.barTip
					.classed('display', false);
			}
		);
}

tipClass.prototype.appendStackBarMouseOver = function() {

	var self = this,
			offset = this._setOffset('BAR-TIP');

	d3.select('#SKETCHPAD').selectAll('rect.stackbar')
		.on('mouseenter', function(d) {
			var 
					posX = 
						parseFloat(this.getAttribute('x')) + 
						parseFloat(this.getAttribute('width')/2),
					posY = 
						parseFloat(this.getAttribute('y'));

				self.barTip
					.classed('display', true)

					// Make the tip's origin fixed at center of circles
					.style('top' , posY + offset.Y + 'px')
					.style('left', posX + offset.X + 'px')

					.html(function() {
						
						var info = 
							'民國 ' + d.year + '<br>' +
						   		d.name + ': ' + d.value;

						// If the percentage value is available.
						if (d.pct) 
							info += '<br>' + (parseFloat(d.pct) * 100).toFixed(2) + '%'

						return '<span id="BAR-INFO">' + info + '</span>'
					})
					.call(function(d) {
						self._correctPos('BAR-TIP')
							._nodeSizeCorrect('BAR-TIP');
					});
		})
		.on(
			'mouseout',
			function(d) {
				self.barTip
					.classed('display', false);
			}
		);;
}



tipClass.prototype._setOffset = function(nodeId) {

	// The origin of tip has to be the same as the origin of the sketchpad.
	var dotTipNode = document.getElementById(nodeId),
		parentContainers = listAncestorNodes(dotTipNode),

		offset = 
			calOffsetFromOrigins(parentContainers, dotTipNode),

		displayPanelWrapperStyle = 
			window.getComputedStyle(document.getElementById('DATABOARD_WRAPPER')),

		displayPanelStyle = 
			window.getComputedStyle(document.getElementById('DATABOARD-vizLayer')),

		svgPadStyle = 
			window.getComputedStyle(document.getElementById('SKETCHPAD'), null),

		headerStyle = 
			window.getComputedStyle(document.getElementById('HDR'), null);

		offset.X += 
				parseInt(displayPanelWrapperStyle['padding-left'].replace('px', '')) +
					parseInt(svgPadStyle['padding-left'].replace('px', '')) +
						parseInt(headerStyle['width'].replace('px', ''));
		offset.Y += 
				parseInt(displayPanelWrapperStyle['padding-top'].replace('px', '')) +
					parseInt(svgPadStyle['padding-top'].replace('px', ''));
	return offset

}


tipClass.prototype._correctPos = function(tipId) {

	var self = this,

		tip = null,

		arrowHeight = 9,
		arrowHalfWidth = 9/Math.sqrt(3);

		(function() {
			if ( tipId === 'DOT-TIP' ) tip = self.dotTip;
			else if ( tipId === 'BAR-TIP' ) tip = self.barTip;
		})();

	// Stores the node's offsetHeight property in case of tip resizing.
	this._bTipH = tip.node().offsetHeight;
	this._bTipW = tip.node().offsetWidth ;

	var originTop = parseInt(tip.node().style.top.replace('px', '')),
		originLeft = parseInt(tip.node().style.left.replace('px', ''));

	var updatedTop = 
			originTop - tip.node().offsetHeight - arrowHeight,
		updatedLeft = 
			originLeft - tip.node().offsetWidth/2 - arrowHalfWidth;

	if ( updatedTop > 0 && updatedLeft > 0 ) {

		tip
			.classed('tip-before-display', false)
			.classed('tip-after-display', true)
			.style('top', updatedTop + 'px')
			.style('left', updatedLeft + 'px');

	/* When the tip is beyond the view we can see */
	} else if ( updatedTop < 0 ) {

		updatedTop = originTop + arrowHeight;

		tip
			.classed('tip-before-display', true)
			.classed('tip-after-display', false)
			.style('top', updatedTop + 'px')
			.style('left', updatedLeft + 'px');

	} 
	return this
}

tipClass.prototype._nodeSizeCorrect = function(tipType) {
	
	var self = this;

	if (tipType === 'BAR-TIP') {

		var nh = self.barTip.node().offsetHeight,
			nw = self.barTip.node().offsetWidth ;

			this.barTip
				.style('top', function() {

					var t = this.style.top;

					if (self._bTipH !== nh) {
						var ot = 
							parseInt(t.replace('px', ''));
						return ot + self._bTipH - nh + 'px' 
					} else 
						return t
				})
				.style('left', function() {

					var l = this.style.left;

					if (self._bTipW !== nw) {
						var ol = 
							parseInt(l.replace('px', ''));
						return ol + self._bTipW/2 - nw/2 + 'px'
					} else
						return l
				})
				// fix the width to prevent the resizing.
				.style('width', function() {
					return nw + 'px'
				});
	}
	else if (tipType === 'DOT-TIP')
		console.log(this.dotTip.node().offsetHeight);

	return this
}

/* Additional Functions */
/* 
	A function for pinnig label at the middle bottom of the element space.
	eleSpace: The width left for each element.
	inPad: 
		The abbreviation about "innerPadding", 
		The padding between each bar
		outPad:
		The abbreviation about "outPadding"
		meaning the padding space between the first bar and the y axis.
*/
function c_pinLbl2XAxisMidPt(xAxis, eleSpace, inPad, outPad) {
	// xAxis is the same as "this" 
	xAxis.selectAll('.tick').attr('transform', function(d, i) {
		return 'translate(' + (outPad+(2*i+1)*eleSpace/2+i*inPad) + ',0)'
	});
}

/*  
	A function for putting label with data value on each bar.
	bars: 
		the bars selected by previous defined seletor function
	d:
		displacement from the head position
*/
function c_placeValOnBarHdV(txt, d, eleSpace, inPad, outPad) {

	var _txt = txt[0];

	for ( var i=0 ; i<_txt.length; i++ ) {

		var _txtBox = _txt[i].getBBox(),

				bWMidPt = _txtBox.width/2,
				bHMidPt = _txtBox.height/2,
				// Displacement in X direction
				xd = parseInt(_txt[i].getAttribute('x')),
				// Displacement in Y direction
				yd = parseInt(_txt[i].getAttribute('y')),
				delta = ( eleSpace/2 < 2*bHMidPt ) ? 
					(eleSpace/2-0.5*bHMidPt*2) : (eleSpace/2-bHMidPt/2);

		_txt[i].setAttribute(
			'transform', 
			'rotate(90, ' + xd + ', ' + yd + ')' +
			'translate(' + d + ',' + (-1 * delta) + ')'); 
	}
}


function listAncestorNodes(node) {

	var childNode = node,

		nodes = [];

	while ( childNode && childNode.parentNode ) {

		if ( childNode.tagName !== 'BODY' ) {

			nodes.push(childNode.parentNode);
			childNode = childNode.parentNode;
		} else childNode = null;
	}
	return nodes
}

function calOffsetFromOrigins(containers, contextNode) {

	var offsetX = 0,
		offsetY = 0,
		borderRex = /\d+px/;

	for ( var i in containers ) {

		var containerSpec = 
			window.getComputedStyle(containers[i], null);

		offsetX += 
			(parseInt(containerSpec['border-left'].match(borderRex)[0].replace('px', '')) + 
				parseInt(containerSpec['padding-left'].replace('px', '')) + 
					parseInt(containerSpec['margin-left'].replace('px', '')));

		offsetY += 
			(parseInt(containerSpec['border-top'].match(borderRex)[0].replace('px', '')) + 
				parseInt(containerSpec['padding-top'].replace('px', '')) + 
					parseInt(containerSpec['margin-top'].replace('px', '')));

	} 
	return { X: offsetX, Y: offsetY }
}
/* A function allows json data to pop a value with specific key. */
function jsonPop(key) {

	var type = Object.prototype.toString.call(this).slice(8, -1);
						
	if ( type === 'Object' ) {
	for ( var k in this ) {
		if ( k === key ) { 

			var val = this[k];
				
				delete this[key]
				return val
				}
			}
		}
		else return undefined
	}

/* 
	A function construct the a data format ({parent: '...', children: '...'}) 
	which is easily transformed into partitions 
*/
function transtoPartitonFormat(obj, popKey) {

	return {
		name: obj.pop(popKey),
		children: 
			(function(d) {

				var ary = [];
					
				for ( var key in d ) {  
					var _d = {};
					if ( Object.prototype
								.toString.call(d[key]).slice(8, -1) 
							!== 'Function' 
					) {
						_d['name'] = key;
						_d['value'] = parseInt(d[key]);
						ary.push(_d);
					}
				}
				return ary
			})(obj)
	}
}


function colorAdjust(hex, colorDelta) {

	// Make the stroke color slightly different from the bars.
	var rgb = colorObj.hexToRgb(hex);
	
	// Abjust one of the color.
	if ( 255 - rgb.r > colorDelta ) rgb.r += colorDelta
	else {
		if ( 255 - rgb.g > colorDelta ) rgb.g += colorDelta
		else {
			if ( 255 - rgb.b > colorDelta) rgb.b += colorDelta
			}
		}

	return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')' 
}

