var LightsOut = function (n, m) {
  this.N = parseInt(n);
  this.M = parseInt(m);

  var maxn = this.M > this.N ? this.M : this.N;

  Array.prototype.getTwo = function (m, n) {
    n = n ? n : m;
    var arr = new Array(m);
    for (var i = 0; i < m; i++) {
      arr[i] = new Array(n);
      for (var j = 0; j < n; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  var aMap;
  var result = new Array(maxn * maxn);

  this.resetAmap = function () {
    var N = this.N, M = this.M;

    // 清空之前的数据
    aMap = Array.prototype.getTwo(maxn * maxn);

    for (var i = 0; i < N; i++) {
      for (var j = 0; j < M; j++) {
        var pos = i * M + j;
        aMap[pos][pos] = 1;
        if (i > 0) aMap[pos][(i - 1) * M + j] = 1;
        if (i < [N - 1]) aMap[pos][(i + 1) * M + j] = 1;
        if (j > 0) aMap[pos][i * M + j - 1] = 1;
        if (j < [M - 1]) aMap[pos][i * M + j + 1] = 1;
      }
    }

    // for(var i = 0; i < M*N; i++){
    //     var s = '';
    //     for(var j = 0; j < M * N; j++){
    //         s = s + ' ' + aMap[i][j];
    //     }
    //     console.log(s);
    // }
  }

  this.Gauss = function (n, m) {

    // 清空 之前的结果
    for (var z = 0; z < result.length; z++) {
      result[z] = 0;
    }

    var r, c;
    for (r = 0, c = 0; r < n && c < m; r++ , c++) {
      var max_r = r;
      for (var i = r + 1; i < n; i++) {
        if (parseInt(aMap[i][c]) > parseInt(aMap[max_r][c])) max_r = i;
      }
      if (aMap[max_r][c] == 0) { r--; continue; }
      if (max_r != r) {
        for (var i = c; i < m + 1; i++) {
          // swap
          var tmp = aMap[max_r][i];
          aMap[max_r][i] = aMap[r][i];
          aMap[r][i] = tmp;
        }
      }

      for (var i = r + 1; i < n; i++) {
        if (aMap[i][c] == 0) continue;
        for (var j = c; j < m + 1; j++) aMap[i][j] ^= aMap[r][j];
      }
    }

    for (var i = m - 1; i >= 0; i--) {
      result[i] = aMap[i][m];
      for (var j = i + 1; j < m; j++) {
        result[i] ^= (aMap[i][j] && result[j]);
      }
    }
  }

  this.getResult = function (stdin) {
    var N = this.N, M = this.M;
    if (typeof stdin === 'string') {
      stdin = stdin.split('');
    }

    this.resetAmap();

    for (var i = 0; i < maxn * maxn; i++){
      result[i] = null;
    }

    for (var i = 0; i < N; i++) {
      for (var j = 0; j < M; j++) {
        aMap[i * M + j][N * M] = stdin[i * M + j];
      }
    }

    this.Gauss(N * M, N * M);

    return result;
  }

  this.printf = function () {
    var N = this.N, M = this.M;
    for (var i = 0; i < N; i++) {
      var ss = '';
      for (var j = 0; j < M; j++) {
        if (j == 0) ss += result[i * M + j];
        else ss = ss + ' ' + result[i * M + j];
      }
      printf("%s\n", ss);
    }
  }


  function printf(x) {
    console.log.apply(this, arguments);
  }

}

module.exports = LightsOut;