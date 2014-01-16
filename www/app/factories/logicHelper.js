AA.factory('logicHelper' , function(){
return {
  // because sometime .sort() doesnt cut it for numbers
	bubbleSort : function(a){

		var swapped;
		    do {
			swapped = false;
			for (var i=0; i < a.length-1; i++) {
			    if (a[i] > a[i+1]) {
				var temp = a[i];
				a[i] = a[i+1];
				a[i+1] = temp;
				swapped = true;
			    }
			}
		    } while (swapped);
	    return a;
	}
};
});
