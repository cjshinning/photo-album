(function(){
    var isGenerate = false;
    var main = {
        init: function(){
            this.event();
        },
        event: function(){
            var _this = this;
            // 添加一张图片
            $('.btn-add').bind('click', function(){
                // console.log(1);
            })
            // 减少一张图片
            $('.btn-minus').bind('click', function(){
                if(isGenerate){
                    return alert('您已经有生成的图片了，如需重新生成图片请刷新页面~');
                }
                if(!$('.album-content li').hasClass('selected')){
                    return alert('请先在相册中选择一张图片！');
                }
                $('.album-content li.selected').remove();
                $('.album-content').css('width', 430 * $('.album-content li').length);
            })
            // 选择要删除的图片
            $('.album-content li').bind('click', function(){
                if(!$(this).hasClass('selected')){
                    $(this).addClass('selected');
                }else{
                    $(this).removeClass('selected');
                }
            })
            // 生成图片
            $('.btn-generate').bind('click', function(){
                if(isGenerate){
                    return alert('您已经有生成的图片了，如需重新生成图片请刷新页面~');
                }
                _this.generateImg();
            })
        },
        generateImg: function(){
            var album = document.querySelector('.album-content');
            var albumScan = document.querySelector('.album-scan');
            var scanSrc = document.querySelector('#scanSrc');
            html2canvas(album, {
                useCORS: true,
                scrollY: 0,
                backgroundColor: null
            }).then(function(canvas) {
                isGenerate = true;
                albumScan.style.display = 'block';
                var imgUrl = canvas.toDataURL('image/png');
                scanSrc.setAttribute('src', imgUrl);
            })
        }
    };

    main.init();
})()