$(function () {

	var IMG_URLS = {
		"news" : [
			"http://anweshadeb.com/prototype/images/Article_Lead_1.png",
			"http://anweshadeb.com/prototype/images/Article_1.png"
		],
		"sports": [
			"http://anweshadeb.com/prototype/images/Slideshow_1.png",
			"http://anweshadeb.com/prototype/images/Slideshow_2.png",
			"http://anweshadeb.com/prototype/images/Slideshow_3.png",
			"http://anweshadeb.com/prototype/images/Sports_Minitron.png",
			"http://anweshadeb.com/prototype/images/Embedtron.png"
		],
		"screen": [
			"http://anweshadeb.com/prototype/images/Screen1.0.png",
			"http://anweshadeb.com/prototype/images/Screen2.0.png",
			"http://anweshadeb.com/prototype/images/Channel_Catalog_In_A_Page.png",
			"http://anweshadeb.com/prototype/images/Channelstrips.png",
			"http://anweshadeb.com/prototype/images/Cinematron_latest.png",
			"http://anweshadeb.com/prototype/images/Premiumtron_In_A_Page.png"
		],
		"others": [
			"http://anweshadeb.com/prototype/images/Yahoo_Homepage_Module.png",
			"http://anweshadeb.com/prototype/images/My_Yahoo_Module.png"
		]
	},
	SELS = {
		"CUR": "current",
		"CUR_LIST": "cur-list",
		"SHOW": "show"
	};

	var workFolioProto = {
		init: function () {
			var self = this;

			self.workThumbs = $('.work-thumbs .thumb');
			self.lightbox   = $('.lightbox');
			self.close      = $('.close');
			self.nextBtn	= self.lightbox.find('.next');
			self.prevBtn	= self.lightbox.find('.prev');

			// build the items
			// TODO : can do this better. post load images
			self._buildLbItems();

			// add event listeners
			$(document).keydown(self._onEscapePress.bind(self));
			self.lightbox.on('click', self._onLightboxClicks.bind(self))
			self.workThumbs.on('click', self._onWorkThumbClick.bind(self));
		},

		_buildLbItems: function () {
			var self 	 = this,
				lbMarkup = '';
			// TODO : old browser support
			$.each(IMG_URLS, function (i, type) {
				lbMarkup += '<div class="lb-list" data-th="' + i + '">';

				$.each(type, function (i, item) {
					lbMarkup += '<img class="lb-img" data-idx="'+ i +'" src="' + item + '"/>';
				});

				lbMarkup += '</div>';
			});

			self.lightbox.find('.lb-cb').append(lbMarkup);
		},

		_onWorkThumbClick: function (e) {
			var self 	= this,
				target 	= $(e.target),
				type	= target.closest('.thumb').data('th');

			self._openLightbox(type);
		},

		_openLightbox: function (type) {
			var self 	= this,
				curList = self.lightbox.find('.' + SELS.CUR_LIST),
				curType = curList && curList.data('th');

			if (curType !== type) {
				// clean up first
				self.lightbox.find('.lb-img.' + SELS.CUR).removeClass(SELS.CUR);
				curList.removeClass(SELS.CUR_LIST);
				self.prevBtn.removeClass(SELS.SHOW);
				self.nextBtn.addClass(SELS.SHOW);

				curList = self.lightbox.find('.lb-list[data-th="'+ type +'"]');
				curList.addClass(SELS.CUR_LIST);
				curList.find('[data-idx="0"]').addClass(SELS.CUR);
			}

			self.lightbox.addClass('show');
		},

		_closeLightbox: function () {
			var self = this;
			self.lightbox.removeClass('show');
		},

		_onEscapePress: function (e) {
			var self = this,
				code = (e.keyCode ? e.keyCode : e.which);

		  if (code === 27) {
		  	self._closeLightbox();
		  }
		},

		_onLightboxClicks: function (e) {
			var self	 = this,
				target 	 = $(e.target);

			if (target.hasClass('close') || target.closest('.lb-inner').length === 0) {
				self._closeLightbox();
			}

			if (target.hasClass('nav-btn')) {
				self._onNavBtnClick(target);
			}
		},

		_onNavBtnClick: function (target) {
			var self 	 = this,
				curList  = self.lightbox.find('.' + SELS.CUR_LIST),
				listSize = curList.children().length,
				curType  = curList && curList.data('th'),
				curNode  = curList && curList.find('.current'),
				curIdx   = curNode && parseInt(curNode.data('idx'), 10),
				dir		 = target.hasClass('next') ? 'next' : 'prev',
				nextIdx  = dir === 'next' ? curIdx + 1 : curIdx - 1,
				nextNode = curList && curList.find('[data-idx="' + nextIdx + '"]'),
                prevFunc = nextIdx > 0 ? 'addClass' : 'removeClass',
                nextFunc = nextIdx < listSize - 1 ? 'addClass' : 'removeClass';

            if (curNode) {
                curNode.removeClass(SELS.CUR);
            }

            if (nextNode) {
                nextNode.addClass(SELS.CUR);
            }

            self.prevBtn[prevFunc](SELS.SHOW);
            self.nextBtn[nextFunc](SELS.SHOW);
		}
 	};

	function objCreate(o) {
		if (typeof Object.create === 'function') {
			return Object.create(o);
		} else {
			var F = function () {};
			F.prototype = o;
			return new F();
		}
	}

	var workfolio = objCreate(workFolioProto);
	workfolio.init();

});