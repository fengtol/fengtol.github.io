'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	浅绿: '#8cc540',
	深绿: '#009f5d',
	暗蓝: '#019fa0',
	蓝色: '#019fde',
	深蓝: '#007cdc',
	深紫: '#887ddd',
	浅紫: '#cd7bdd',
	粉色: '#ff5675',
	橙色: '#ff8345',
	黄色: '#f8bd0b',
	灰色: '#d1d2d4',
	钢蓝: '#4682B4',
	天蓝色: '#87CEEB',
	深天蓝: '#00BFFF',
	亮天蓝色: '#87CEFA',
	珊瑚: '#FF7F50',
	秘鲁色: '#CD853F',
	暗绿色: '#006400',
	黄绿色: '#7FFF00',
	草绿色: '#7CFC00',
	绿黄色: '#ADFF2F',
	暗橄榄绿: '#556B2F',
	橄榄褐色: '#6B8E23',
	亮菊黄: '#FAFAD2',
	橄榄: '#808000',
	暗金菊黄: '#B8860B',
	水鸭色: '#008080',
	茶色: '#D2B48C',
	硬木色: '#DEB887',
	银灰色: '#C0C0C0',
};
window.resColors = {
	2: window.chartColors.red,
	3: window.chartColors.orange,
	4: window.chartColors.yellow,
	6: window.chartColors.green,
	9: window.chartColors.blue,
	10141: window.chartColors.purple,
	10241: window.chartColors.浅绿,
	10341: window.chartColors.深绿,
	10441: window.chartColors.暗蓝,
	10541: window.chartColors.蓝色,
	141: window.chartColors.钢蓝,
	241: window.chartColors.深紫,
	541: window.chartColors.天蓝色,
	741: window.chartColors.深天蓝,
	66641: window.chartColors.亮天蓝色,
	"spoils": window.chartColors.黄色,
	"fight_count": window.chartColors.橙色,
	"finish_count": window.chartColors.粉色,
	"ship_count": window.chartColors.灰色,
	"sl_count": window.chartColors.浅紫,
	"path_count": window.chartColors.深蓝,
/* 分割 */
	"fight_num": window.chartColors.珊瑚,
	"hurt_ship_num":  window.chartColors.秘鲁色,
	"sink_ship_num":  window.chartColors.暗绿色,
	"miss_num":  window.chartColors.黄绿色,
	"pvp_win_num": window.chartColors.草绿色,
	"repair_num":window.chartColors.绿黄色,
	"ammo_num": window.chartColors.暗橄榄绿,
	"steel_num":  window.chartColors.橄榄褐色,
	"oil_num": window.chartColors.亮菊黄,
	"aluminium_num":  window.chartColors.暗金菊黄,
	"build_boat_num":window.chartColors.水鸭色,
	"level":  window.chartColors.茶色,
	"exp":window.chartColors.硬木色,
	"love":window.chartColors.银灰色,
};
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}
(function (global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function (seed) {
			this._seed = seed;
		},

		rand: function (min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function (config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function (config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function (config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function (index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function (color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function () {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics

}(this));
