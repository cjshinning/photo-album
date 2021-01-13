(function(){
    var isGenerate = false;
    var main = {
        init: function(){
            this.event();
        },
        event: function(){
            var _this = this;

            $(document)
                // 删除图片
                .on('click', ".minus",function(){
                    if($('.album-content li').length < 2){
                        return alert('请至少保留一张图片哦～');
                    }
                    $(this).parents('li').remove();
                    _this.resizeAlbum();
                })
                // 新增图片
                .on('change', ".add-pic",function(){
                    var self = this;
                    var tpl = '<li>\
                            <a href="javascript:;">\
                                <img src="{$img}" width="400" height="305" alt="">\
                                <div class="mask">\
                                    <div class="control-btns">\
                                        <i class="add">\
                                            <input type="file" accept="image/png,image/gif,image/jpeg" class="add-pic">\
                                            +\
                                        </i>\
                                        <i class="minus">-</i>\
                                    </div>\
                                </div>\
                            </a>\
                        </li>';
                    var reader = new FileReader();
                    reader.onload = function(ev){
                        var imgFile =ev.target.result;
                        if(imgFile){
                            tpl = tpl.replace('{$img}', imgFile);
                        }
                        $(self).parents('li').after(tpl);
                        _this.resizeAlbum();
                        // document.querySelector('.pic1').src = ev.target.result;
                    }
                    reader.readAsDataURL(this.files[0]);
                })
                // 生成图片
                .on('click', ".btn-generate",function(){
                    if(isGenerate){
                        return alert('您已经有生成的图片了，如需重新生成图片请刷新页面~');
                    }
                    _this.generateImg();
                })
        },
        resizeAlbum: function(){
            $('.album-content').css('width', 430 * $('.album-content li').length);
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