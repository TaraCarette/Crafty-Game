// rules are:
// 1 is top
// 2 is right
// 3 is bottom
// 4 is left
// 0 is no arrow for set time
// 5, 6, 7 is for speed change- slow, normal, fast respectively
// 8 is signal for randomizer, number after is amount that gets ranomdly shot

//should be so slow can be continious arrows and get all

//problem if last arrow fires and hits before slower arrows do- goes straight to win
//arrows going ahead of other arrows causes colour changing to be funny





function p1() {
	var p = [5,8,40];//[5,4,7,0,0,1,2,3,2,1];//6,1,1,1,5,4,1,2,3,7,4,1,2,3,5,2,4,2,3,7,1,0,1,5,1];//[5,8,40];//"5403020103040301020302040302";
	return p;
}

function p2() {
	var p = [6,8,40];
	return p;
}

function p3() {
	var p = [7,8,40]; //arrows after random wrong speed
	return p;
}

// 61111234321234430040
//6111711111
