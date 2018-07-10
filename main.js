  var podajStopien = document.querySelector(".podajStopien");
   var oblicz = document.querySelector(".oblicz");
   var wartoscMiejscaZerowego, pierwiastekFunkcji;
   var wynik = 0;
   var wspolczynniki = [],
      wsp = [];

   function Horner(wsp, st, x) {
      if (st == 0) {
         return wsp[0];
      }
      return x * Horner(wsp, st - 1, x) + wsp[st];
   }

   function pobranyWielomian() {
      var wspolczynnikWielomianu = parseFloat(document.getElementById("inputStopienW").value);
      return wspolczynnikWielomianu;
   };

   function kolejneWielomiany(a) {
      var child = document.getElementsByName('kolejneWspolczynnikiWielomianu[]');
      for (var i = pobranyWielomian(); i >= 0; i--) {
         wspolczynniki.push(parseFloat(child[i].value));
      }
      wspolczynniki.reverse();
      return wspolczynniki;
   };

   podajStopien.addEventListener("click", function() {
      var pobranyDiv = document.getElementById("pobierzDane");
      if (pobranyWielomian() > 100) {
         alert("Za duzy stopien wielomianu");
      } else {
         var newlabel = document.createElement("label");
         newlabel.innerHTML = "Podaj teraz kolejne wspolczynniki wielomianu. Zaczynij od tego z najwieksza potegą: <br>";
         pobranyDiv.appendChild(newlabel);
         for (var i = pobranyWielomian(); i >= 0; i--) {
            var newInput = document.createElement("INPUT");
            newInput.name = "kolejneWspolczynnikiWielomianu[]";
            newInput.type = "number";
            var newp = document.createElement("Label");
            newp.innerHTML = 'x[' + i + '] :';
            pobranyDiv.appendChild(newp);
            pobranyDiv.appendChild(newInput);
            var br = document.createElement("br");
            pobranyDiv.appendChild(br);
         }
         var newlabel = document.createElement("Label");
         newlabel.innerHTML = "Poczatek przedzialu: ";
         pobranyDiv.appendChild(newlabel);
         var poczatek = document.createElement("input");
         poczatek.name = "poczatek";
         poczatek.type = "number";
         pobranyDiv.appendChild(poczatek);
         var newlabelK = document.createElement("Label");
         newlabelK.innerHTML = "<br>Koniec przedzialu: ";
         pobranyDiv.appendChild(newlabelK);
         var koniec = document.createElement("input");
         koniec.name = "koniec";
         koniec.type = "number";
         pobranyDiv.appendChild(koniec);
         var newlabelI = document.createElement("Label");
         newlabelI.innerHTML = "<br>Podaj liczbe iteracji: ";
         pobranyDiv.appendChild(newlabelI);
         var iteracje = document.createElement("input");
         iteracje.name = "iteracje";
         iteracje.type = "number";
         pobranyDiv.appendChild(iteracje);
         var newlabelE = document.createElement("Label");
         newlabelE.innerHTML = "<br>Podaj dokladnosc obliczanej wartosci pierwiastka funkcji: ";
         pobranyDiv.appendChild(newlabelE);
         var eps = document.createElement("input");
         eps.name = "eps";
         eps.type = "number";
         eps.step = 0.1;
         pobranyDiv.appendChild(eps);
         oblicz.style.display = 'initial';
         podajStopien.style.display = 'none';
         document.getElementById("inputStopienW").style.display = "none";
         document.getElementById("labelStopienW").style.display = "none";
      }
   }, false);

   oblicz.addEventListener("click", function() {
      var poczatekPrzedzialu = parseFloat(document.getElementsByName("poczatek")[0].value);
      var koniecPrzedzialu = parseFloat(document.getElementsByName("koniec")[0].value);
      var iteracje = parseFloat(document.getElementsByName("iteracje")[0].value);
      var stopien = parseFloat(pobranyWielomian());
      var eps = parseFloat(document.getElementsByName("eps")[0].value);
      kolejneWielomiany(wspolczynniki);
      var wartoscFunkcjiPrzedzialuPoczatkowego = Horner(wspolczynniki, stopien, poczatekPrzedzialu);
      var wartoscFunkcjiPrzedzialuKoncowego = Horner(wspolczynniki, stopien, koniecPrzedzialu);
      if (wartoscFunkcjiPrzedzialuPoczatkowego * wartoscFunkcjiPrzedzialuKoncowego > 0) {
         alert("Funkcja nie spelnia zalozen");
      } else {
         var licznik = 0;
         while (Math.abs(poczatekPrzedzialu - koniecPrzedzialu) > eps) {
            if (licznik > iteracje) {
               alert("Przekroczono maksymalna liczbe iteracji obliczen");
               return 0;
            }
            pierwiastekFunkcji = (poczatekPrzedzialu + koniecPrzedzialu) / 2;
            wartoscMiejscaZerowego = Horner(wspolczynniki, stopien, pierwiastekFunkcji);
            if (Math.abs(wartoscMiejscaZerowego) < eps) break;
            if (wartoscFunkcjiPrzedzialuPoczatkowego * wartoscMiejscaZerowego < 0)
               koniecPrzedzialu = pierwiastekFunkcji;
            else {
               poczatekPrzedzialu = pierwiastekFunkcji;
               wartoscFunkcjiPrzedzialuPoczatkowego = wartoscMiejscaZerowego;
            }
            licznik++;
         }
      }
      document.getElementById("wynik").innerHTML = "Pierwiastek funkcji wynosi " + pierwiastekFunkcji;
   }, false);