module.exports = function () {

    var functions = {
        memberOperation: function () {
            $(".dataMemberTarget").click(function () {

                var url = $(this).attr('data-member-target');
                $.ajax({
                    type: "GET",
                    url: "include/" + url + ".html",
                    dataType : 'html',
                    cache: false,
                    success : function(data){
                        $("#header .member-operations").remove();
                        $('#header').append(data);
                        $("body").addClass("body-no-scroll");
                        $("#memberOperationClose").click(function () {
                            var memberID = $(this).attr('data-close');
                            $(memberID).addClass("disabled");
                            setTimeout(function () {
                                $(memberID).remove();
                                $("body").removeClass("body-no-scroll");
                            },500)
                        });
                    },
                    complete: function() {
                        $("body").addClass("body-no-scroll");
                        $("#memberOperationClose, .member-back").click(function () {
                            $(".member-operations").addClass("disabled");
                            setTimeout(function () {
                                $(".member-operations").remove();
                                $("body").removeClass("body-no-scroll");
                            },500)
                        });
                    }
                });
            });
        },


    };
    functions.memberOperation();
    return functions;

};


