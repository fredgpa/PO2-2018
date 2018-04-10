var app = angular.module('App', []);
app.directive("trab1Directive", function() {
    return {
        templateUrl : "./templates/trab1.html"
    };
});
app.directive("minDirective", function() {
    return {
        templateUrl : "./templates/min.html"
    };
});
app.directive("multiDirective", function() {
    return {
      templateUrl : "./templates/multi.html"
   };
});
app.directive("homeDirective", function() {
    return {
        templateUrl : "./templates/home.html"
    };
});
app.controller('navCtrl', function($scope) {
  $scope.page='home';
});
app.controller('minCtrl', function($scope) {
    $scope.viewDica=true;
    $scope.viewModal=false;
    $scope.multimetodo="";
    $scope.metodo="dico";
      $scope.trab1metodo="";
    //Essas variaveis tem binding com os inputs, pra facilitar não use elas
    //Dentro das funções crie variaveis ex: let a= $scope.a;

    $scope.arcos = [];
    $scope.qntArcos = '';
    $scope.qntNos = '';
    //Variaveis mono
    $scope.a = '';
    $scope.b = '';
    $scope.delta = '';
    $scope.l = '';
    $scope.epsilon = 0.1;
    $scope.expressao = 'x1^2-x1*x2+x2^2-2x1+x2';
    //Variaveis multi
    $scope.variables=[];



    $scope.arcosSize = function(array){
      let n=$scope.qntArcos-array.length;
      console.log(n);
      if(n<0)
        for(i=0;i<(-n);i++)
          array.pop();
      else
        for(i=0;i<n;i++)
          array.push(0);
    }

    $scope.selecGrafos = function(){
        //Essa função vai chamar os métodos e receber o resultado retornado
        let arcos = $scope.arcos;
        let qntArcos = $scope.qntArcos;
        let qntNos = $scope.qntNos;
        $scope.viewModal=true;
        switch ($scope.trab1metodo) {
            case 'flux_max':
              $scope.resultado=fluxo_maximo(arcos, qntArcos, qntNos);
              break;
            case 'perc_min':
              $scope.resultado=percurso_minimo(arcos, qntArcos, qntNos);
              break;
            case 'ext_min':
              $scope.resultado=extensao_minima(arcos, qntArcos, qntNos);
              break;
            default:
                console.log("Erro");
                $scope.viewModal=false;
        }
    }

    var extensao_minima = function(arcos, qntArcos, qntNos){
      let rede = [];
      let no = 1;
      let valor;
      let valor_final = 0;
      rede.push(no);
      for (var j = 0; j < qntNos - 1; j++) {
        valor  = 1000000;
        for (var i = 0; i < qntArcos; i++) {
          if (redes.indexOf(arcos[i][1]) != -1 && redes.indexOf(arcos[i][2]) == -1) {
            if (arcos[i][3] < valor) {
              valor = arcos[i][3];
              no = arcos[i][2];
            }
          }else if (redes.indexOf(arcos[i][2]) != -1 && redes.indexOf(arcos[i][1]) == -1) {
            if (arcos[i][3] < valor) {
              valor = arcos[i][3];
              no = arcos[i][1];
            }
          }
        }
        valor_final += valor;
        rede.push(no);


      }
      return rede;
    }

    var percurso_minimo = function(arcos, qntArcos, qntNos){

    }

    var fluxo_maximo = function(arcos, qntArcos, qntNos){

    }
    // função que calcula a derivada de primeira ordem
    // da expressao no ponto x
    var derivadaPrimeira = function(e,x){
      console.log(e);
      let h = 0.001;
      let x1 = Number(x) + Number(h);
      let x2 = Number(x) - Number(h);
      let r1 = math.eval(e,{x: Number(x1)});
      let r2 = math.eval(e,{x: Number(x2)});
      let p = ((r1)-(r2))/(2*h);
      let q = p;
      h = h/2;
      do {
        x1 = Number(x) + Number(h);
        x2 = Number(x) - Number(h);
        r1 = math.eval(e,{x: Number(x1)});
        r2 = math.eval(e,{x: Number(x2)});

        p = ((r1)-(r2))/(2*h);
        h = h/2;
        dif = p-q;
        q = p;
      }while (Math.abs(dif)>0.00001);
      return p;
    }

    // função que calcula a derivada de primeira ordem
    // da expressao no ponto x
    var derivadaSegunda = function(e,x){
      let h = 0.001;
      let x1 = Number(x) + 2*Number(h);
      let x2 = Number(x) - 2*Number(h);
      let r1 = math.eval(e,{x: Number(x1)});
      let r2 = math.eval(e,{x: Number(x2)});
      let r3 = 2*math.eval(e,{x: Number(x)});
      let p = (r1 - r3 + r2)/(4*h*h);
      let q = p;
      h = h/2;
      do {
        x1 = Number(x) + 2*Number(h);
        x2 = Number(x) - 2*Number(h);
        r1 = math.eval(e,{x: Number(x1)});
        r2 = math.eval(e,{x: Number(x2)});
        r3 = 2*math.eval(e,{x: Number(x)});
        p = (r1 - r3 + r2)/(4*h*h);
        h = h/2;
        dif = p-q;
        q = p;
      }while (Math.abs(dif)>0.00001);
      return p;
    }

    var identityMatrixGenerator = function(n){
      let d =[];
      let aux = [];
      for(let line=0; line<n; line++){
        for(let i=0; i<n; i++){
          if(i==line)
            d[i]=1;
          else
            d[i]=0;
        }
        aux[line]=d.slice();
      }
      return aux;
    }

    var functionReplacement = function(ex, y, direction, n, k){
      let auxExpression = ex.slice();
      let xValues = [];
      for(let i =0; i<n; i++){
        xValues[i] = yAndLambdaArray(y,direction[i],n);
      }
      for (i = 0; i < n; i++) {
        var xVar = 'x' + (i + 1);
        //Substitui todas as ocorrências de xi na string
        auxExpression = auxExpression.split(xVar).join(xValues[k][i]);
      }
      return auxExpression;
    }

    var hessiano = function(func, x, qte, ep){
      var hessiana = [];
      for (var j = 0; j < qte; j++) {
        hessiana[j] =[];
        for(var s = 0; s < qte; s++){
          hessiana[j][s] = derivadaParcialSegunda(j, s, ep, x, func);
        }
      }
      return hessiana;
    };

    var derivadaParcialSegunda= function(veti, vetj, ep, x, func){
      var h = ep * 1000;
      var xi,xj,f1,f2,f3,f4,p,q;
      if (isNaN(ep)) {
        alert("Digite um número válido para o ε");
        return;
      }
      xi = x[veti];
      xj = x[vetj];
      if(veti !== vetj){
        try {
          x[veti] = xi - (-h);
          x[vetj] = xj - (-h);
          f1 = calculaFuncao(func, x);
          x[vetj] = xj - h;
          f2 = calculaFuncao(func, x);
          x[veti] = xi - h;
          x[vetj] = xj - h;
          f4 = calculaFuncao(func, x);
          x[vetj] = xj - (-h);
          f3 = calculaFuncao(func, x);
          p = (f1-f2-f3-(-f4))/(4*h*h);

        } catch (e) {
          alert(e);
          return;
        }
      }
      else{
        x[veti] = xi - (-2*h);
        f1 = calculaFuncao(func, x);
        x[veti] = xi - 2*h;
        f3 = calculaFuncao(func, x);
        x[veti] = xi;
        f2 = calculaFuncao(func, x);
        try {
          p = (f1 - 2*f2 -(-f3))/(4*h*h);

        } catch (e) {
          alert("Erro");
        }
      }

      for (var j = 0; j < 10; j++) {
        try {
          h = h/2;

        } catch (e) {
          alert("Erro");
          return;
        }
        q = p;
        if(veti !== vetj){
          try {
            x[veti] = xi - (-h);
            x[vetj] = xj - (-h);
            f1 = calculaFuncao(func, x);
            x[vetj] = xj - h;
            f2 = calculaFuncao(func, x);
            x[veti] = xi - h;
            x[vetj] = xj - h;
            f4 = calculaFuncao(func, x);
            x[vetj] = xj - (-h);
            f3 = calculaFuncao(func, x);
            p = (f1-f2-f3-(-f4))/(4*h*h);
          } catch (e) {
            alert("Erro");
            return;
          }
        }
        else {
          try {

            x[veti] = xi - (-2*h);
            f1 = calculaFuncao(func, x);
            x[veti] = xi - 2*h;
            f3 = calculaFuncao(func, x);
            x[veti] = xi;
            f2 = calculaFuncao(func, x);
            p = (f1 - 2*f2 +f3)/(4*h*h);
          } catch (e) {
            alert("Erro");
            return;
          }

        }
        if(Math.abs(p-q)<=ep){
          x[veti]=xi;
          x[vetj]=xj;
          if(Math.abs(p-0)<=0.0001)
          return 0;
          return p;

        }
      }

      x[veti]=xi;
      x[vetj]=xj;
      if(Math.abs(p-0)<=0.0001)
      return 0;
      return p;

    };

    var derivadaParcialPrimeira = function(func,what,ep,x){
      var h = 1000*ep;
      var xi,f1,f2,p,q;
      try {
        xi = x[what];
        x[what] = xi-(-h);
        // f1 = math.eval(func,{x: Number(x[0]),y: Number(x[1]),z: Number(x[2])});
        f1 = calculaFuncao(func, x);
        // console.log(f1+"   1     "+ h);
        x[what] = xi-h;
        // f2 = math.eval(func,{x: Number(x[0]),y: Number(x[1]),z: Number(x[2])});
        f2 = calculaFuncao(func, x);
        // console.log(f2+"   1     "+ h);
        p = (f1-f2)/(2*h);
      } catch (e) {
        console.log("Erro");
      }
      for (var j = 0; j < 10; j++) {
        try {
          if(isNaN(x[what])){
            // alert("Lembrou de digitar o valor das variáveis?");
          }
          q = p;
          h = h/2;
          x[what] = xi-(-h);
          // f1 = math.eval(func,{x: Number(x[0]),y: Number(x[1]),z: Number(x[2])});
          f1 = calculaFuncao(func, x);
          // console.log(f1+"   2       " + h);
          x[what] = xi-h;
          // f2 = math.eval(func,{x: Number(x[0]),y: Number(x[1]),z: Number(x[2])});
          f2 = calculaFuncao(func, x);
          p = (f1-f2)/(2*h);
        } catch (e) {
          // alert("Erro");
        }
        if(Math.abs(p-q)<=ep){
          x[what]=xi;
          return p;

        }
      }
      return p;

    };

    var calculaFuncao = function(ex,x) {
      var parser = math.parser();
      parser.eval('f(x1,x2,x3,x4,x5,x6,x7,x8,x9) =' + ex);  // f(x, y)
      var f = parser.get('f');
      return f(x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8]);
    }

    var novoX = function(x, w, qte) {
      var newX = [];
      for (var i = 0; i < qte; i++) {
        newX[i] = arredonda(Number(x[i]) + Number(w[[i]]));
      }
      return newX;
    }

    var calculaGradiente = function(func,x,qte){
      var grad = [];
      for (var i = 0; i < qte; i++) {
        grad[i] = derivadaParcialPrimeira(func, i, 0.001,x);
      }
      return grad;
    };

    var arredonda = function(x) {
      var yo = Math.round(x*100000000);
      return yo/100000000;
    }

    var normaDiferenca = function(x, y, n){
      norma = 0;
      for(let i=0; i<n; i++){
        norma = norma + Math.pow((x[i]-y[i]),2);
      }
      return  Math.sqrt(norma);
    }

    var yAndLambdaArray = function(y,direction,n){
      let ex = [];
      for(let i=0; i<n; i++){
        ex[i] = '(' + y[i] + '+ x *' + direction[i] + ')';
      }
      return ex;
    }

    //MULTIVARIAVEIS
    $scope.selecMulti = function(){
      let epsilon = $scope.epsilon;
      let expressao = $scope.expressao;
      let x0= $scope.variables;
      let n = $scope.qntVar
        $scope.viewModal=true;
        switch ($scope.multimetodo) {
          case 'cicli':
              $scope.resultado=coordCiclica(epsilon,x0,expressao,n);
              break;
          case 'hooke':
              $scope.resultado=hookeJeeves(epsilon,x0,expressao,n);
              break;
          case 'grad':
              $scope.resultado=gradiente(epsilon,x0,expressao,n);
              break;
          case 'newton':
              $scope.resultado=newtonMultiplo(epsilon,x0,n,expressao);
              break;
          case 'gradconj':
              $scope.resultado=hookeJeeves(epsilon,x0,expressao,n);
              break;
          case 'fer':
              $scope.resultado=hookeJeeves(epsilon,x0,expressao,n);
              break;
          case 'dfp':
              $scope.resultado=DFP(epsilon,x0,expressao,n);
              break;
            default:
                console.log("Erro");
                $scope.viewModal=false;
                break;
        }
    }
    $scope.varSize = function(array){
      let n=$scope.qntVar-array.length;
      console.log(n);
      if(n<0)
        for(i=0;i<(-n);i++)
          array.pop();
      else
        for(i=0;i<n;i++)
          array.push(0);
    }

    //MONOVARIÁVEIS
    $scope.selec = function(){
        //Essa função vai chamar os métodos e receber o resultado retornado
        let a = $scope.a;
        let b = $scope.b;
        let delta = $scope.delta;
        let l = $scope.l;
        let epsilon = $scope.epsilon;
        let expressao = $scope.expressao;
        if (a > b) {
          $scope.a = b;
          $scope.b = a;
          a = $scope.a;
          b = $scope.b;
        }
        $scope.viewModal=true;
        switch ($scope.metodo) {
            case 'uniforme':
              $scope.resultado=uni(a,b,delta,expressao);
              break;
            case 'aurea':
              $scope.resultado=secaoAurea(l,a,b,expressao);
              break;
            case 'dico':
              $scope.resultado=dico(a,b,epsilon,l,expressao);
              break;
            case 'fibo':
              $scope.resultado=fibo(l,a,b,expressao);
              break;
            case 'bis':
              $scope.resultado=bis(l,a,b,expressao);
              break;
            case 'newton':
              $scope.resultado=newton(epsilon,a,b,expressao);
              break;
            default:
                console.log("Erro");
                $scope.viewModal=false;
        }
    }

    var uni = function(a, b, d, ex){
      a = parseFloat(a);
      b = parseFloat(b);
      d = parseFloat(d);
      let gatilho = false;
      let aux = a;
      while(aux < b) {
        fx = math.eval(ex,{x: aux});
        aux += d;
        fxk = math.eval(ex,{x: aux});
        if (fxk > fx) {
          if(gatilho){
            return aux - d;
          }
          else {
            aux -= 2*d;
            d = d/10;
            gatilho = true;
          }
        }
      }
      return aux - d;
    }

    var dico = function(a, b, ep, l, ex){
      a = parseFloat(a);
      b = parseFloat(b);
      ep = parseFloat(ep);
      l = parseFloat(l);
      let x, y, f1, f2;
      while(l<(b-a)) {
        x = (a+b)/2 - ep;
        y = x + 2*ep;

        f1 = math.eval(ex, {x: x});
        f2 = math.eval(ex, {x: y});

        if(f2<f1) {
          a = x;
        }
        else {
          b = y;
        }
      }
      return (a+b)/2;
    }

    var secaoAurea = function(l, a, b, e){
      let p1 = parseFloat(a);
      let p2 = parseFloat(b);
      l = parseFloat(l);
      let aux = p2 - p1;
      let alfa = (-1 + Math.sqrt(5))/2;
      let aux1 = p1 + (1 - alfa)*(p2 - p1);
      let aux2 = p1 + alfa*(p2 - p1);
      while(aux > l){
        if(math.eval(e, {x: aux1}) > math.eval(e, {x: aux2})){
          p1 = aux1;
          aux1 = aux2;
          aux2 = p1 + alfa*(p2 - p1);
        }else{
          p2 = aux2;
          aux2 = aux1;
          aux1 = p1 + (1 - alfa)*(p2 - p1);
        }
        aux = p2 - p1;
      }
      return (p1 + p2)/2;
    }

    var fibo = function(l, a, b, e){
      let p1 = parseFloat(a);
      let p2 = parseFloat(b);
      let k = 0;
      l = parseFloat(l);
      let aux = p2 - p1;
      let Fn = (p2 - p1)/l;
      let seq_fibo = [], sair = true, cont, n;
      seq_fibo[0] = 1; seq_fibo[1] = 1;
      for(cont = 2; sair = false; cont++){
        seq_fibo[cont] = seq_fibo[cont-1] + seq_fibo[cont-2];
        if(seq_fibo[cont] > Fn)
          sair = true;
        n = cont;
      }
      let max = n - 1;
      let aux1 = p1 + (seq_fibo[n - k - 2]/seq_fibo[n - k])*(p2 - p1);
      let aux2 = p1 + (seq_fibo[n - k - 1]/seq_fibo[n - k])*(p2 - p1);
      while(aux > l && k < max){
        if(math.eval(e, {x: aux1}) > math.eval(e, {x: aux2})){
          p1 = aux1;
          aux1 = aux2;
          aux2 = p1 + (seq_fibo[n - k - 1]/seq_fibo[n - k])*(p2 - p1);
        }else{
          p2 = aux2;
          aux2 = aux1;
          aux1 = p1 + (seq_fibo[n - k - 2]/seq_fibo[n - k])*(p2 - p1);
        }
        aux = p2 - p1;
        k++;
      }
      return (p1 + p2)/2;
    }

    var bis = function(l, a, b, e){
      let p1 = parseFloat(a);
      let p2 = parseFloat(b);
      l = parseFloat(l);
      let aux = p2 - p1;
      let x = (p2 + p1)/2;
      let der;
      while(aux > l){
        der = derivadaPrimeira(e, x);
        if(der == 0)
          return x;
        else if(der > 0)
          p2 = x;
        else if(der < 0)
          p1 = x;
        x = (p2 + p1)/2;
      }
      return x;
    }

    var newton = function(epsilon, a, b, e){
      let p1 = parseFloat(a);
      let p2 = parseFloat(b);
      epsilon = parseFloat(epsilon);
      let x = a, der1, der2;
      let k=0;
      while(Math.abs(derivadaPrimeira(e, x)) > epsilon && k<100){
        k++;
        der1 = derivadaPrimeira(e, x);
        der2 = derivadaSegunda(e, x);
        if(der2 != 0)
          x = x - der1/der2;
      }
      return x;
    }

    var coordCiclica = function(epsilon, x0, ex, n){
      let lambda;
      let k=1;
      let y = [];
      let x = [];
      let direction = identityMatrixGenerator(n);
      let nova_expressao;
      let norma;
      x[0] = 0;
      x[1] = 3;
      while (true) {
        y = x.slice();
        for(let i=0; i<n; i++){
          nova_expressao = functionReplacement(ex,y,direction,n,i);
          lambda = newton(0.1, 0, 0, nova_expressao);
          for(let j = 0; j<n; j++){
            y[j] = y[j] + lambda*direction[i][j];
          }
        }
        norma = 0;
        for(let i=0; i<n; i++){
          norma = norma + Math.pow((x[i]-y[i]),2);
        }
        norma =  Math.sqrt(norma);
        if (norma < epsilon || k>100) {
          return x;
        }
        x = y;
        k++;
      }
      return 0;
    }

    var hookeJeeves = function(epsilon, x0, ex, n){
      let lambda;
      let k=1;
      let y = [];
      let x = [];
      let direction = identityMatrixGenerator(n);
      let yAux = [];
      let nova_expressao;
      let norma;
      x[0] = 0;
      x[1] = 3;
      y = x.slice();
      while (true) {
        console.log("k " +k);
        for(let i=0; i<n; i++){
          nova_expressao = functionReplacement(ex,y,direction,n,i);
          lambda = newton(0.1, 0, 0, nova_expressao);
          for(let j = 0; j<n; j++){
            y[j] = y[j] + lambda*direction[i][j];
          }
          console.log("lambda " +lambda);
        }
        norma = 0;
        for(let i=0; i<n; i++){
          norma = norma + Math.pow((x[i]-y[i]),2);
          direction[0][i] = y[i]-x[i];
        }
        norma =  Math.sqrt(norma);
        if (norma < epsilon || k>100) {
          return x;
        }
        yAux = y.slice();
        nova_expressao = functionReplacement(ex,y,direction,n,0);
        lambda = secaoAurea(0.01, -1000, 1000, nova_expressao);
        for(let j = 0; j<n; j++){
          y[j] = y[j] + lambda*direction[0][j];
        }
        x = yAux.slice();
        console.log("x " +x);
        k++;
        direction = identityMatrixGenerator(n);
      }
      return 0;
    }

    var gradiente = function(epsilon, x0, e, n){
      let k = 0;
      let d = [];
      let x = [];
      let lambda;
      let nova_expressao = e.slice();
      x = x0;
      grad = calculaGradiente(e, x, n);
      console.log(grad);
      while(math.norm(grad) >= epsilon){
        for(let i=0; i<n; i++)
          d[i] = -grad[i];
        console.log(d);
      for(let j=0;j<n;j++){
        nova_expressao = nova_expressao.replace(new RegExp("x"+(j+1),'g'),  "("+x[j]+"+"+d[j]+"x)");
      }
      lambda = secaoAurea(0.01, -1000, 1000, nova_expressao);
      console.log(lambda);
      for(let i=0; i<n; i++)
        x[i] = x[i] + lambda*d[i];
      k++;
      console.log(x);
      grad = calculaGradiente(e, x, n);
      console.log(grad);
    }
    return x;
    }

    var newtonMultiplo = function(epsilon, x0, n, ex){
      let x = x0.slice();
      let y, k=0;
      let h, direcao;
      while(math.norm(calculaGradiente(ex,x,n)) > epsilon){
        k++;
        y = x.slice();
        h = hessiano(ex, y.slice(), 2, 0.001);
        console.log(k++);
        console.log(h);
        console.log(calculaGradiente(ex,x,n));
        console.log(x);
        direcao = math.multiply(-1,calculaGradiente(ex,x.slice(),n));
        w = math.lusolve(h, direcao);
        x = novoX(x.slice(), w, n);
        if(normaDiferenca(x.slice(),y.slice(),n) < epsilon || k>100){
          return x.slice();
        }
      }
      return x;
    }

    var gradienteConj = function(epsilon, x0, e){
        let g = [];
        let d = [];
        let lambda;
        do{
          g = calculaGradiente(e, x, n);
          for(let i=0; i<n; i++)
            d[i] = -g[i];
          for(let k=0; k<n; k++){
            hessi = hessiano(ex, x, n, 0.001);
            for(let i=0; i<n; i++)
              lambda[i] = -(g[i]*d[i]/d[i]*hessi[i]*d[i]);
            g = calculaGradiente(e, x, n);
            if(k<n-1){
              b = g*Hessiana()*d/d*hessiano(ex, x, n, 0.001)*d;
              d = -g + b*d;
            }
          }
        }while(g>epsilon)
        return x;
    }

    var DFP = function(epsilon, x0, ex, n){

      let S= math.eye(n);
      console.log("S="+S);
      let g= calculaGradiente(ex, x0, n);
      let gaux;
      console.log("g="+g);
      let d;
      let a;
      let k = 0;
      let i = 0;
      let x = math.matrix(x0);
      let q;
      let qtrans;
      let p;
      let ptrans;
      let nova_expressao;
      let test1;
      let test2;
      let test3;
      while(math.norm(g)>=epsilon){
        nova_expressao= ex.valueOf();
        console.log("|grad|="+math.norm(g));
        d= math.multiply(g,math.unaryMinus(S));
        console.log(x);
        for(let j=0;j<n;j++){
          nova_expressao = nova_expressao.replace(new RegExp("x"+(j+1),'g'),  "("+x.get([j])+"+"+d.get([j])+"x)");
          console.log("j,x,d:"+(j+1)+","+x.get([j])+","+d.get([j]));
        }
        console.log("exp: "+nova_expressao);
          a = secaoAurea(0.01, -1000, 1000, nova_expressao);
        console.log("a="+a);
        x = math.add(x,math.multiply(a,d));
        console.log("x="+x);
        if(k<n-1){
          console.log("k="+k);
          gaux= calculaGradiente(ex,x.toArray(),n);
          console.log()
          q= math.subtract(gaux,g);
          console.log("q="+q);
          p= math.multiply(a,d);
          console.log("p="+p);
          ptrans=math.transpose(p);
          console.log(ptrans);
          qtrans=math.transpose(q);
          console.log(test3);
          test3= math.multiply(ptrans,p);
          test1= math.divide(math.multiply(p,ptrans),math.multiply(ptrans,q));
          test2=math.divide(
              math.multiply(math.multiply(math.multiply(S,q),qtrans),S),
              math.multiply(math.multiply(qtrans,S),q)
            );
          console.log("teste1");
          console.log(test1);
          console.log("teste2");
          console.log(test2);
          console.log("teste3");
          S= math.subtract(math.add(S,test1),test2);
          console.log("S="+S);
          k++;
        }
        else{
          i++;
          g=calculaGradiente(ex,x.toArray(),n)
          k = 0;
        }
        break;
      }
      return x;
    }

});
