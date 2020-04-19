<template>
  <v-layout
    column
    justify-center
    align-center
    style="
      width: 100%;
      height: 100%;
    "
  >
    <v-flex
      xs12
      sm8
      md6
      :style="`
        width: ${bookWidth}px;
        height: ${bookHeight}px;
        position: relative;
      `"
    >
      <div class="book">
        <canvas class="pageflip-canvas"></canvas>
        <div class="pages">
          <section class="page">
            <div class="page-content">
              <h2>History</h2>
              <p>Canvas was initially introduced by Apple for use inside their own Mac OS X WebKit component, powering applications like Dashboard widgets and the Safari browser. Later, it was adopted by Gecko browsers and Opera and standardized by the WHATWG on new proposed specifications for next generation web technologies.</p>
            </div>
          </section>
          <section class="page">
            <div class="page-content">
              <h2>Usage</h2>
              <p>Canvas consists of a drawable region defined in HTML code with height and width attributes. JavaScript code may access the area through a full set of drawing functions similar to other common 2D APIs, thus allowing for dynamically generated graphics. Some anticipated uses of canvas include building graphs, animations, games, and image composition.</p>
            </div>
          </section>
          <section class="page">
            <div class="page-content">
              <h2>Reactions</h2>
              <p>At the time of its introduction the canvas element was met with mixed reactions from the web standards community. There have been arguments against Apple's decision to create a new proprietary element instead of supporting the SVG standard. There are other concerns about syntax e.g. the absence of a namespace.</p>
            </div>
          </section>
          <section class="page">
            <div class="page-content">
              <h2>Support</h2>
              <p>The element is currently supported by the latest versions of Mozilla Firefox, Google Chrome, Safari, and Opera. It is not natively implemented by Internet Explorer (IE) as of version 8, though support is in development for Internet Explorer 9; however, many of the Canvas element's features can be supported in IE, for example by using Google or Mozilla plugins, JavaScript libraries and either Adobe Flash or IE's proprietary VML.</p>
            </div>
          </section>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      ratio: "16:9",
      ratioX: 0,
      ratioY: 0,
      bookPaddingX: 20,
      bookPaddingY: 10,
      page: 0,
      bookWidth: 0,
      bookHeight: 0,
      pageWidth: 0,
      pageHeight: 0,
      canvas: undefined,
      context: undefined,
      mouse: { x: 0, y: 0 },
      flips: [],
      book: undefined,
      // List of all the page elements in the DOM
      pages: undefined,
    }
  },
  watch: {
    bookWidth() {
      document.querySelector('.book').style.width = this.bookWidth + "px"
      document.querySelectorAll('.pages').forEach(el => {
        el.style.width = this.bookWidth - 20 + "px"
      })
    },
    bookHeight() {
      document.querySelector('.book').style.height = this.bookHeight + "px"
      document.querySelectorAll('.pages').forEach(el => {
        el.style.height = this.bookHeight - 10 + "px"
      })
    },
    pageWidth() {
      console.log(this.pageWidth)
      document.querySelector('.page').style.width = this.pageWidth + "px"
      document.querySelectorAll('.page-content').forEach(el => {
        el.style.width = this.pageWidth + "px"
      })
    },
    pageHeight() {
      console.log(this.pageHeight)
      document.querySelector('.page').style.height = this.pageHeight + "px"
      document.querySelectorAll('.page-content').forEach(el => {
        el.style.height = this.pageHeight + "px"
      })
    }
  },
  computed: {
      // Vertical spacing between the top edge of the book and the papers
      pageY() {
        return ( this.bookHeight - this.pageHeight ) / 2
      },
      viewport() {
        let viewPortWidth;
        let viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
          viewPortWidth = window.innerWidth,
          viewPortHeight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
        }

        // older versions of IE
        else {
          viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
          viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
        }
        return [viewPortWidth, viewPortHeight];
      }
  },
  mounted() {
    const splittedRatio = this.ratio.split(":")
    this.ratioX = parseInt(splittedRatio[0])
    this.ratioY = parseInt(splittedRatio[1])
    console.log()
    this.bookWidth = this.viewport[0] * 0.7
    this.bookHeight = (this.bookWidth * this.ratioY / this.ratioX)
    this.pageWidth = (this.bookWidth / 2 ) - 20
    this.pageHeight = this.bookWidth * this.ratioY / (this.ratioX) - 10
      
    this.canvas = document.getElementsByClassName( "pageflip-canvas" )[0];
    this.context = this.canvas.getContext( "2d" );
    this.book = document.getElementsByClassName( "book" )[0];
    this.pages = this.book.querySelectorAll( "SECTION" );
    for( let i = 0, len = this.pages.length; i < len; i++ ) {
      this.pages[i].style.zIndex = len - i;
      this.flips.push( {
        // Current progress of the flip (left -1 to right +1)
        progress: 1,
        // The target value towards which progress is always moving
        target: 1,
        // The page DOM element related to this flip
        page: this.pages[i], 
        // True while the page is being dragged
        dragging: false
		  } );
    }
    // Resize the canvas to match the book size
    this.canvas.width = this.bookWidth - 20
    this.canvas.height = this.bookHeight - 10
    
    // Offset the canvas so that it's padding is evenly spread around the book
    // this.canvas.style.top = -this.canvasPadding + "px";
    // this.canvas.style.left = -this.canvasPadding + "px";
    
    // Render the page flip 60 times a second
    setInterval( this.render, 1000 / 60 );
    
    document.addEventListener( "mousemove", this.mouseMoveHandler );
    document.addEventListener( "mousedown", this.mouseDownHandler );
    document.addEventListener( "mouseup", this.mouseUpHandler );
  },
  methods: {
    mouseMoveHandler( event ) {
      // Offset mouse position so that the top of the spine is 0,0
      this.mouse.x = event.clientX - this.book.offsetLeft - ( this.bookWidth / 2 );
      this.mouse.y = event.clientY - this.book.offsetTop;
    },
    mouseDownHandler( event ) {
      if (Math.abs(this.mouse.x) < this.pageWidth) {
        if (this.mouse.x < 0 && this.page - 1 >= 0) {
          this.flips[this.page - 1].dragging = true;
        } else if (this.mouse.x > 0 && this.page + 1 < this.flips.length) {
          this.flips[this.page].dragging = true;
        }
      }
      // Prevents the text selection cursor from appearing when dragging
      event.preventDefault();
    },
    mouseUpHandler( event ) {
      for( var i = 0; i < this.flips.length; i++ ) {
        if( this.flips[i].dragging ) {
          this.flips[i].target = this.mouse.x < 0 ? -1 : 1;
          if( this.flips[i].target === 1 ) {
            this.page = this.page - 1 >= 0 ? this.page - 1 : this.page;
          } else {
            this.page = this.page + 1 < this.flips.length ? this.page + 1 : this.page;
          }
        }
        this.flips[i].dragging = false;
      }
    },
    render() {
      this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
      
      for (var i = 0; i < this.flips.length; i++) {
        var flip = this.flips[i];
        
        if( flip.dragging ) {
          flip.target = Math.max( Math.min( this.mouse.x / this.pageWidth, 1 ), -1 );
        }
        
        flip.progress += ( flip.target - flip.progress ) * 0.2;
        
        // If the flip is being dragged or is somewhere in the middle of the book, render it
        if( flip.dragging || Math.abs( flip.progress ) < 0.997 ) {
          this.drawFlip( flip );
        }
        
      }
      
    },
    
    drawFlip( flip ) {
      // Strength of the fold is strongest in the middle of the book
      var strength = 1 - Math.abs( flip.progress );
      
      // Width of the folded paper
      var foldWidth = ( this.pageWidth * 0.5 ) * ( 1 - flip.progress );
      
      // X position of the folded paper
      var foldX = this.pageWidth * flip.progress + foldWidth;
      
      // How far the page should outdent vertically due to perspective
      var verticalOutdent = 20 * strength;
      
      // The maximum width of the left and right side shadows
      var paperShadowWidth = ( this.pageWidth * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
      var rightShadowWidth = ( this.pageWidth * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
      var leftShadowWidth = ( this.pageWidth * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
      
      
      // Change page element width to match the x position of the fold
      flip.page.style.width = Math.max(foldX, 0) + "px";
      
      this.context.save();
      this.context.translate(10 + (this.bookWidth / 2) , this.pageY + 10) ;
      
      
      // Draw a sharp shadow on the left side of the page
      this.context.strokeStyle = 'rgba(0,0,0,'+(0.05 * strength)+')';
      this.context.lineWidth = 30 * strength;
      this.context.beginPath();
      this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
      this.context.lineTo(foldX - foldWidth, this.pageHeight + (verticalOutdent * 0.5));
      this.context.stroke();
      
      
      // Right side drop shadow
      var rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
      rightShadowGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.2)+')');
      rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
      
      this.context.fillStyle = rightShadowGradient;
      this.context.beginPath();
      this.context.moveTo(foldX, 0);
      this.context.lineTo(foldX + rightShadowWidth, 0);
      this.context.lineTo(foldX + rightShadowWidth, this.pageHeight);
      this.context.lineTo(foldX, this.pageHeight);
      this.context.fill();
      
      
      // Left side drop shadow
      var leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
      leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
      leftShadowGradient.addColorStop(1, 'rgba(0,0,0,'+(strength*0.15)+')');
      
      this.context.fillStyle = leftShadowGradient;
      this.context.beginPath();
      this.context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
      this.context.lineTo(foldX - foldWidth, 0);
      this.context.lineTo(foldX - foldWidth, this.pageHeight);
      this.context.lineTo(foldX - foldWidth - leftShadowWidth, this.pageHeight);
      this.context.fill();
      
      
      // Gradient applied to the folded paper (highlights & shadows)
      var foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
      foldGradient.addColorStop(0.35, '#fafafa');
      foldGradient.addColorStop(0.73, '#eeeeee');
      foldGradient.addColorStop(0.9, '#fafafa');
      foldGradient.addColorStop(1.0, '#e2e2e2');
      
      this.context.fillStyle = foldGradient;
      this.context.strokeStyle = 'rgba(0,0,0,0.06)';
      this.context.lineWidth = 0.5;
      
      // Draw the folded piece of paper
      this.context.beginPath();
      this.context.moveTo(foldX, 0);
      this.context.lineTo(foldX, this.pageHeight);
      this.context.quadraticCurveTo(foldX, this.pageHeight + (verticalOutdent * 2), foldX - foldWidth, this.pageHeight + verticalOutdent);
      this.context.lineTo(foldX - foldWidth, -verticalOutdent);
      this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
      
      this.context.fill();
      this.context.stroke();
      
      
      this.context.restore();
    }
  }
}
</script>

<style lang="scss" scoped>

.book {
	border-top: 5px yellow solid;
	border-bottom: 5px yellow solid;
	border-left: 10px yellow solid;
	border-right: 10px yellow solid;
	position: absolute;
	left: 0;
	top: 0;
}
.pages section {
	background: #fff;
	display: block;
	position: absolute;
	left: 50%;
	overflow: hidden;
}
	.pages section>div {
		display: block;
    position: absolute;
		font-size: 12px;
    top: 0;
    left: 0;
	}
	.pages section p,
	.pages section h2 {
		padding: 3px 35px;
		line-height: 1.4em;
		text-align: justify;
	}
	.pages section h2{
		margin: 15px 0 10px;
	}

.pageflip-canvas {
	position: absolute;
	z-index: 100;
}

</style>