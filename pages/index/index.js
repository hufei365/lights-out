//index.js
//获取应用实例
const app = getApp();

const LightsOut = require('../../util/lights-out/lights-out.js');
var lightout;
Page({
  data: {
    rows: 4,
    cols: 4,
    showAnswer: true
  },
  //事件处理函数
  onLoad: function () {
    this.reset(this.data.rows,this.data.cols);
  },

  bindRows: function(e){
    var rows = parseInt(e.detail.value);
    if (!rows) {
      return;
    }
    if (rows > 20) {
      rows = 20;
    }
    this.reset(rows, this.data.cols);
  },

  bindCols: function(e){
    var cols = parseInt(e.detail.value);
    if(!cols){
      return;
    }
    if( cols > 7 ){
      cols = 7;
    }
    this.reset(this.data.rows, cols);
  },

  reset: function (rows, cols) {
    var self = this;

    for (var x = 0; x < rows; x++) {
      
      for (var y = 0; y < cols; y++) {
        self.setData({
          ['lights[' + x + '][' + y + '].status']: false,
          ['lights[' + x + '][' + y + '].class.left']: y == 0 ? 'left':'',
          ['lights[' + x + '][' + y + '].class.top']: x == 0 ? 'top': ''
        });
      }
    }

    this.setData({ 'cols': cols, 'rows': rows });

    lightout = new LightsOut(rows, cols);
  },

  tapFn: function (e){
    var cPos = e.currentTarget.dataset;
    this.setData({
      ['lights['+ cPos.x +']['+ cPos.y +'].status']: !cPos.status
    });
    if(cPos.x - 1 >= 0){
      this.setData({
        ['lights[' + (cPos.x - 1) + '][' + cPos.y + '].status']: !this.data.lights[cPos.x - 1][ cPos.y ].status
      });
    }
    if(cPos.y + 1 < this.data.cols){
      this.setData({
        ['lights[' + cPos.x + '][' + (cPos.y+1) + '].status']: !this.data.lights[cPos.x][cPos.y+1].status
      });
    }
    if (cPos.x + 1 < this.data.rows) {
      this.setData({
        ['lights[' + (cPos.x + 1) + '][' + cPos.y + '].status']: !this.data.lights[cPos.x + 1][cPos.y].status
      });
    }
    if (cPos.y - 1 >= 0) {
      this.setData({
        ['lights[' + cPos.x  + '][' + (cPos.y-1) + '].status']: !this.data.lights[cPos.x][cPos.y-1].status
      });
    }
  },

  showAnswer: function(){
    var page = this;
    var rows = this.data.rows,
        cols = this.data.cols,
        lights = this.data.lights;

    var stdin = '';
    for(var i = 0; i < rows; i++){
      for(var j = 0; j < cols; j++){
        stdin = (stdin + (lights[i][j].status ? '1' : '0'));
      }
    }
    
    var results = lightout.getResult(stdin);
    
      for(var i = 0 ; i < rows; i++){
        for(var j = 0; j< cols; j++){
          page.setData({
            ['lights[' + i + '][' + j + '].class.needClick']: results[i*cols + j] ? 'need-click' : ''
          });
        }
      }

    page.setData({
      showAnswer: false
    });
  },

  clearAnswer: function(){
    var page = this;
    var rows = this.data.rows,
      cols = this.data.cols;
    page.setData({
      showAnswer: true
    });
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        page.setData({
          ['lights[' + i + '][' + j + '].class.needClick']: ''
        });
      }
    }
  }


})
