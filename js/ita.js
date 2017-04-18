var ita = angular.module("ita",['ngRoute']);//instanca naseg modula

ita.run(function($rootScope, $http){//pokrecemo modul
	$http.get("serverska_logika/login.php").success(function (data){
		$rootScope.ulogovan = (data == 1);
	});
	//rootScope je oblast koja se formira za aplikaciju
	$rootScope.ulogovan = false;//inicijalizcija globalne(za nasu aplikaciju) promjenjive ulogovan
});

ita.config(function($routeProvider){//konfigurisanje aplikacije
	//metoda when vrsi rutiranje kad za url ima formu koju ona ocekuje
	$routeProvider.when('/home',{//kod koriscenja when() metode, mi u stvari koristimo Ajax koji za nas ide do servera i dobavlja stranice
		templateUrl: "view/home.html"
	}).when('/contact',{
		templateUrl: "view/contact.html"
	}).when('/products',{
		templateUrl: "view/products.html",
		controller: "ProductsController"//za ovu rutu (/products) postoji kontroler i ovo je ovdje poziv tog kontrolera
	}).when('/details/:id_prod',{//slanje parametara
		templateUrl: "view/details.html",
		controller: "DetailsController" //jos jedan kontroler
	}).otherwise({
		redirectTo: '/home'// za sve ostale URL vrijednosti
	});
});
//ovdje dole nad modulom ita kreiramo kontroler za rutu (/products)
ita.controller("ProductsController", function($scope, $http){
//ova funkcija je konstruktor novog objekta i ona kreira scope izmedju kontrolera i view-a. Mi u taj scope mozemo da postavimo nesto sto ce biti vidljivo view-u.
//$http service (ajax) nam koristi za dobavljanje podataka sa servera
	$http.get("serverska_logika/proizvodi.php").success(function(data){//ova funkcija prihvata objekat(data), koji je vec ovdje prekonvertovani json u javascript objekat
		$scope.products = data;
	});
});
ita.controller("DetailsController", function($scope, $http, $routeParams){
	var id = $routeParams.id_prod;//$routeParams je objekat koji kupi parametre i smjesti ih kao svoja svojstva, kod nas je to id_prod 
	$http.get("serverska_logika/proizvodi.php?id="+id).success(function(data){
		$scope.product = data[0];
	}).error(function(){//funkcija za kontrolu gresaka
		alert("Greska za $http-om");
	});
});

ita.filter("searchFor", function(){
//funkcija koja je parametar filter metode(tj. kada se pravi filter) uvijek vraca funkciju!!!!
	return function(arr, searchString){
		//ova funkcija uvijek prima dva parametra, prvi je niz a drugi je parametar koji joj se prosljedjuje
		if(!searchString)//moramo da obradimo situaciju kad jos uvijek nije proslijedjen srting. ako nije proslijedjen, tj. ako kad ga negiramo dobijemo true onda mozemo vratiti taj niz, sto znaci da niz odgovara u cijelini 
		{
			return arr;
		}
		
		var rezultat = [];//kasnije cemo ovaj niz puniti iz products promjenjive
		searchString = searchString.toLowerCase();
		
		angular.forEach(arr, function(tel){
			if(tel.naziv.toLowerCase().indexOf(searchString) !== -1){
				rezultat.push(tel);
			}
		});
		return rezultat;
	}
});
