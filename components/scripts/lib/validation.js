
module.exports = function () {
    (function($){
        $.fn.serializeObject = function(){

            var self = this,
                json = {},
                push_counters = {},
                patterns = {
                    "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                    "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                    "push":     /^$/,
                    "fixed":    /^\d+$/,
                    "named":    /^[a-zA-Z0-9_]+$/
                };


            this.build = function(base, key, value){
                base[key] = value;
                return base;
            };

            this.push_counter = function(key){
                if(push_counters[key] === undefined){
                    push_counters[key] = 0;
                }
                return push_counters[key]++;
            };

            $.each($(this).serializeArray(), function(){

                // skip invalid keys
                if(!patterns.validate.test(this.name)){
                    return;
                }

                var k,
                    keys = this.name.match(patterns.key),
                    merge = this.value,
                    reverse_key = this.name;

                while((k = keys.pop()) !== undefined){

                    // adjust reverse_key
                    reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                    // push
                    if(k.match(patterns.push)){
                        merge = self.build([], self.push_counter(reverse_key), merge);
                    }

                    // fixed
                    else if(k.match(patterns.fixed)){
                        merge = self.build([], k, merge);
                    }

                    // named
                    else if(k.match(patterns.named)){
                        merge = self.build({}, k, merge);
                    }
                }

                json = $.extend(true, json, merge);
            });

            return json;
        };
    })(jQuery);

    var functions = {
        loginFormValidate: function () {

            $("form.loginForm").each(function() {
                var form = $(this);

                $(this).validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                    password:{required : true},
                    firstName: {required: true,minlength: 2, alfabetic:true},
                    lastName:{required: true,minlength: 2, alfabetic:true},
                    emailAddress: {required: true,email: true,altar_email:true},

                    repeatPassword:{required : true, PasswordRepeat:true},
                    terms :{required: true},
                },
                messages: {
                    firstName: "Lütfen adınızı belirtiniz.",
                    lastName:"Lütfen soyadınızı belirtiniz.",
                    emailAddress: "Lütfen geçerli bir e-posta adresi giriniz.",
                    phone: "Lütfen numaranızı giriniz.",
                    password:"Lütfen bir şifre giriniz.",
                    repeatPassword:{
                        required: "Lütfen bir şifre giriniz."
                    },
                    terms : "Lütfen kullanım şartlarını ve gizlilik bildirimini kabul ediniz.",

                },
                submitHandler: function(form) {

                    var loginForm = $(form).serializeObject();
                    console.log(loginForm.loginType);
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(loginForm) + '&formType=' + loginForm.loginType,
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
             });
            });

            functions.addValidators();

        },
        passwordResetFormValidate: function () {
            $("#passwordResetForm").validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                },
                messages: {
                    phone: "Lütfen numaranızı giriniz.",

                },
                submitHandler: function(form) {

                    var resetForm = $("#passwordResetForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(resetForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        verificationFormValidate: function () {
            $("#verificationForm").validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                },
                messages: {
                    phone: "Lütfen numaranızı giriniz.",

                },
                submitHandler: function(form) {

                    var verificationForm = $("#verificationForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(verificationForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        changePasswordFormValidate: function () {
            $("#changePasswordForm").validate({
                ignore:[],
                rules: {
                    password:{required : true},
                    passwordRepeat:{required : true, repeatPassword:true},
                },
                messages: {
                    password: "Lütfen şifrenizi giriniz.",
                    passwordRepeat:{
                        required: "Lütfen şifrenizi giriniz."
                    },

                },
                submitHandler: function(form) {

                    var changePassForm = $("#changePasswordForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(changePassForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        registerFormValidate: function () {

            $("form.registerForm").each(function() {
                var form = $(this);

                $(this).validate({
                    ignore:[],
                    rules: {
                        firstName: {required: true,minlength: 2, alfabetic:true},
                        lastName:{required: true,minlength: 2, alfabetic:true},
                        password:{required : true},
                        terms :{required: true},
                    },
                    messages: {
                        firstName: "Lütfen adınızı belirtiniz.",
                        lastName:"Lütfen soyadınızı belirtiniz.",
                        password:"Lütfen bir şifre giriniz.",
                        terms : "",

                    },
                    submitHandler: function(form) {

                        var registerForm = $(form).serializeObject();
                        console.log(registerForm.registerType);
                        $.ajax({
                            type:'POST',
                            url: '#',
                            data: $.param(registerForm) + '&formType=' + registerForm.registerType,
                            beforeSend: function() {

                            },
                            success: function(response) {
                                if(response.success == true){

                                }
                                else{
                                }
                            },
                            failure: function() {

                            },
                            error: function() {

                            }
                        });
                        return false;
                    }
                });
            });

            functions.addValidators();

        },
        addValidators : function(){
            jQuery.validator.addMethod("checkMobilePhone", function(value, element , params) {

                var prmVal = $(params).val();
                if(value.length >0 && prmVal.length > 0 ){
                    if(/^\d+$/.test(value) && /^\d+$/.test(prmVal)){
                        if(value.length == 3 && value.substring(0,1) == "5" && prmVal.length == 7 ){

                            var myRegx = /^(.)\1*$/;
                            var deger = "1234567";
                            if(myRegx.test(prmVal) == false && prmVal != deger && prmVal.length == 7 ){
                                return true;
                            }
                        }
                    }
                }

                this.errorList.push({
                    message: "",
                    element: $(params)[0]
                });

                return false;

            }, "");

            jQuery.validator.addMethod("alfabetic", function(value, element , params) {

                var myRegxp = /^([a-zA-ZışüöçğİŞÜÇÖĞ ]+)$/;
                if(myRegxp.test(value)!=false || value == "")
                {
                    return true;
                }
                return false;

            }, "");

            jQuery.validator.addMethod("numbersOnly", function(value, element) {
                return this.optional(element) || /^[0-9]+$/i.test(value);
            }, "");

            jQuery.validator.addMethod("phoneControlNew", function(value, element , params) {
                //tum rakamlar ayni olamaz ve 1234567890 olamaz
                var myRegx = /^(.)\1*$/;
                var deger = "1234567890";
                //var lenlimit = $(".newContactForm").length > 0 ? 10 : 7;
                if(myRegx.test(value) == false && value != deger /*&& value.length == lenlimit*/ ){
                    return true;
                }
                return false;
            },"");

            jQuery.validator.addMethod("repeatPassword", function(value, element , params) {

                var _password = $("input[name=password]").val();
                var _passwordRepeat = $("input[name=passwordRepeat]").val();

                if(_password == _passwordRepeat){
                    return true;
                }
                else{
                    return false;
                }
            }, "Şifreler uyuşmuyor.");
            jQuery.validator.addMethod("altar_email", function(value, element , params) {
                var myRegxp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,6}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var titles=["test", "deneme"];
                if(myRegxp.test(value)!=false || value == "")
                {
                    for(item_mail in titles){
                        indx = value.toLowerCase().indexOf(titles[item_mail].toLowerCase());
                        if(indx >-1){
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }, "");

        }

    };

    if ($("form").length > 0) {
        functions.loginFormValidate();
        functions.passwordResetFormValidate();
        functions.changePasswordFormValidate();
        functions.registerFormValidate();
        functions.verificationFormValidate();
    }
    return functions;

};




