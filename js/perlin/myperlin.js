class Myperlin {

	constructor () {
		this.permutation = [151,160,137,91,90,15,					
		131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
		190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
		88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
		77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
		102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
		135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
		5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
		223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
		129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
		251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
		49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
		138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

		this.p =[];
		for(var x=0;x<512;x++) {
			this.p[x] = this.permutation[x%256];
		}
	}

	octavePerlin(x, y, z, octaves, persistence) {
		var total = 0;
		var frequencey= 1;
		var amplitutde = 1;
		var maxValue = 0;
		for (var i = 0; i < octaves; i++){
			total += (x * frequencey, y * frequencey, z * frequencey) * amplitutde;

			maxValue += amplitutde;
			amplitutde *= persistence;
			frequencey *= 2;
		}
		return total/maxValue;
	}

	perlin(x, y, z){
		var xi = x & 255;
		var yi = y & 255;
		var zi = z & 255;
		var xf = x - Math.floor(x);
		var yf = y - Math.floor(y);
		var zf = z - Math.floor(z);

		var u = this.fade(xf);
		var v = this.fade(yf);
		var w = this.fade(zf);

		var aaa = this.p[this.p[this.p[    xi ]+    yi ]+    zi ];
		var aba = this.p[this.p[this.p[    xi ]+this.inc(yi)]+    zi ];
		var aab = this.p[this.p[this.p[    xi ]+    yi ]+this.inc(zi)];
		var abb = this.p[this.p[this.p[    xi ]+this.inc(yi)]+this.inc(zi)];
		var baa = this.p[this.p[this.p[this.inc(xi)]+    yi ]+    zi ];
		var bba = this.p[this.p[this.p[this.inc(xi)]+this.inc(yi)]+    zi ];
		var bab = this.p[this.p[this.p[this.inc(xi)]+    yi ]+this.inc(zi)];
		var bbb = this.p[this.p[this.p[this.inc(xi)]+this.inc(yi)]+this.inc(zi)];
	
		var x1, x2, y1, y2;
		x1 = this.lerp(	this.grad (aaa, xf  , yf  , zf),				// The this.gradient function calculates the dot product between a pseudorandom
					this.grad (baa, xf-1, yf  , zf),				// this.gradient vector and the vector from the input coordinate to the 8
					u);										// surrounding points in its unit cube.
		x2 = this.lerp(	this.grad (aba, xf  , yf-1, zf),				// This is all then lerped together as a sort of weighted average based on the faded (u,v,w)
					this.grad (bba, xf-1, yf-1, zf),				// values we made earlier.
			          u);
		y1 = this.lerp(x1, x2, v);

		x1 = this.lerp(	this.grad (aab, xf  , yf  , zf-1),
					this.grad (bab, xf-1, yf  , zf-1),
					u);
		x2 = this.lerp(	this.grad (abb, xf  , yf-1, zf-1),
		          	this.grad (bbb, xf-1, yf-1, zf-1),
		          	u);
		y2 = this.lerp (x1, x2, v);
		
		return (this.lerp (y1, y2, w)+1)/2;	
	}

	inc (num){
		num++;
		return num;
	}

	grad(hash, x, y, z){
		var h = hash & 15;
		var u = h < 8 ? x : y;

		var v;

		if (h < 4){
			v = y;
		}
		else if (h === 12 || h === 14){
			v = x;
		}
		else {
			v = z;
		}

		return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v)
	}

	fade(t){
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	lerp (a, b, x){
		return a + x * (b - a);
	}
}
