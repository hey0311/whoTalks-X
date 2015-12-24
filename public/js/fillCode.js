/**
 * Created by Echo on 2015/12/23.
 */

$(function () {


    var cn = 5;

    var timer = setInterval(function () {
        if (cn >= 0) {
            $("#count").html(cn+"s");
            cn--;
        } else {
            clearInterval(timer);
            $("#count").hide();
            $(".reSend").addClass("danger").addClass("color-fff");
        }
    }, 1000);


    /**
     * 输入验证码时 重发验证码的提示以及计时器都应清空 -- 逻辑错误-- give up
     * */
    /*$("#code").keyup(function () {
        clearInterval(timer);
    });*/

    /*给重新发送按钮绑定touch事件*/
    var reSendDom = document.getElementsByClassName("reSend");

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(reSendDom);
        }, false);

        $(".reSend").on("touchend", function () {
            var ret = confirm("重新发送验证码到" + phoneNum + "吗？");
            if (ret) {
                $.ajax({
                    url: '/sendCode',
                    type: "post",
                    data: {
                        'phone': +phoneNum
                    },
                    dataType: "json",
                    success: function (data) {
                        //alert(global.phone);//js里面是获取不到node中global对象中数据的
                        if (data.status === "success") {
                            window.location.reload();
                        }
                    }
                })
            }
        });
        /*reSendDom.addEventListener("touchend", function () {
            var ret = confirm("重新发送验证码到" + phoneNum + "吗？");
            if (ret) {
                $.ajax({
                    url: '/sendCode',
                    type: "post",
                    data: {
                        'phone': +phoneNum
                    },
                    dataType: "json",
                    success: function (data) {
                        //alert(global.phone);//js里面是获取不到node中global对象中数据的
                        if (data.status === "success") {
                            window.location.reload();
                        }
                    }
                })
            }
        })*/

    } else {
        console.log("can not recognize addEventListener.....");
    }



    /**
     * click finish button to emit save option
     * */
    $("#save").on("touchend", function () {
        /*$.ajax({
            url: "test.html",
            cache: false
        })
            .done(function (data, textStatus, jqXHR) {

            })
            .success(function (data, status) {
                console.log(data)
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log('error: '+textStatus);
            });*/


        $.ajax({
            url: '/saveAccount',
            type: 'post',
            data: {
                phone: phoneNum,
                password: $("#password").val(),
                code: $("#code").val()
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //Upload progress
                XMLHttpRequest.upload.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                        console.log(percentComplete);
                    }
                }, false);
                //Download progress
                XMLHttpRequest.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with download progress
                        console.log(percentComplete);
                    }
                }, false);
            },
            success: function (data, status) {
                console.log(data);
            }

        })
    })


});