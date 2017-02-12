//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
	var charNum = countChar(txt);
	var wordNum = countNum(txt);
	var lineNum = countLine(txt);
	var emptyNNum = countNEmpty(txt);
	var maxNum = countMaxLine(txt);
	var avgNum = countAverage(txt);
	var palin = countPalin(txt);
	var longest = countLongest(txt);
	var frequent = countFrequent(txt);
	if(charNum == 0){
		wordNum = 0;
		longest=[];
		frequent=[];
	}

    return {
        nChars: charNum,
        nWords: wordNum,
        nLines: lineNum,
        nNonEmptyLines: emptyNNum,
        averageWordLength: avgNum,
        maxLineLength: maxNum,
        palindromes: palin,
        longestWords: longest,
        mostFrequentWords: frequent
    };
}

function countChar(word){
	var check = word.replace(/\n/g,"");
	return check.length;
}

function editPunc(word){
	var fix = word.replace(/\.|\,|\!|\?|\"|\(|\)|\[|\]|\{|\}|\;|\@|\&|\:|\+|\-/g," ");
	fix = fix.replace(/[\s]+/gim,' ');
	fix = fix.trim();
	return fix.toLowerCase();
}

function countNum(word){
	var wordEdit = editPunc(word);
	var count = wordEdit.split(' ');
	return count.length;
}

function countLine(word){
	var count = word.split("\n");
	if(count == ""){
		return count.length = 0;
	}
	return count.length;
}

function countNEmpty(word){
	var count = 0;
	var list = word.replace(/\t/g,"");
	list = list.trim();
	list = list.split("\n");
	for (var i = 0; i < list.length; i++) {
		if(list[i].trim() != ""){
			count++;
		}
	}
	return count;
}

function countMaxLine(word){
	var sep = word.split("\n");
	var maxCount = 0;
	for (var i = 0; i < sep.length; i++) {
		if(sep[i].length > maxCount){
			maxCount = sep[i].length;
		}
	}
	return maxCount;
}

function countAverage(word){
	var avg = 0.0;
	var edit = editPunc(word);
	edit = edit.split(" ");
	for (var i = 0; i < edit.length; i++) {
		avg = avg + edit[i].length;
	}
	avg = (avg/edit.length);
	return avg;
}

function countPalin(word){
	var edit = editPunc(word);
	var pal = [];
	edit = edit.toLowerCase().split(" ");
	for (var i = 0; i < edit.length; i++) {
		var helper = edit[i].split("");
		if(helper.toString() == helper.reverse().toString()){
			var exist = false;
			for (var p = 0; p < pal.length; p++) {
				if(pal[p].toString() == edit[i].toString()){
					exist = true;
				}
			}
			if(exist == false && (edit[i].length > 2)){
				pal.push(edit[i]);
			}
		}
	}
	return pal;
}

function countLongest(word){
	var edit = editPunc(word);
	var list = [];
	edit = edit.toLowerCase().split(" ");
	edit = edit.sort(function(a,b){
		return a.length-b.length;
	});
	var dup = edit;
	var counter = 0;
	while(list.length < 10 && dup.length > 0){
		var exist = false;
		var item = dup.pop();
		for (var p = 0; p < list.length; p++) {
			if(list[p] == item){
				exist = true;
			}
		}
		if(exist == false){
			list[counter] = item;
			counter++;
		}	
	}
	return list;
}

function countFrequent(word){
	var edit = editPunc(word);
	var list = [];
	edit = edit.toLowerCase().split(" ");
	edit = edit.sort();
	var begin;
	for (var i = 0; i < edit.length; i++) {
		begin = edit[i];

		if(!list[begin]){
			list[begin] = 1
		}else{
			list[begin]++;
		}
	}
	
	var max = [];
	max = Object.keys(list).map(function(item){
		return{
			name: item,
			amount: list[item]
		}
	});
	max.sort(function(a,b){
		return b.name-a.name
	});
	max.sort(function(a,b){
		return b.amount-a.amount
	});

	var finalList = [];
	for (var i = 0; i < max.length; i++) {
		if(finalList.length < 10){
			finalList.push(max[i].name + "(" + max[i].amount + ")");
		}
	}
	
	return finalList;
}