// ==UserScript== 
// @name RESTful Postcrossing
// @namespace http://www.hanafuda.cz/
// @description Adds a RESTful way to register your Postcrossing cards.
// @include http://www.postcrossing.com/* 
// @grant none
// ==/UserScript==

(function() {
    var restfulUrlRegExp = /^http:\/\/www\.postcrossing\.com\/([A-Z]+)-?(\d+)$/i;
    var receiveUrlRegExp = /^http:\/\/www\.postcrossing\.com\/receive\?receive\[country_code\]=([A-Z]+)&receive\[number\]=(\d+)$/i;
    var upperCaseHref = window.location.href.toUpperCase();
    
    // The URL is RESTful: www.postcrossing.com/CC-123456
    var restfulUrlMatch = upperCaseHref.match(restfulUrlRegExp);
    if(restfulUrlMatch) {
        var country_code = restfulUrlMatch[1];
        var number = restfulUrlMatch[2];
    
        var redirectHref = 'http://www.postcrossing.com/receive?';
        redirectHref += 'receive[country_code]=' + country_code + '&';
        redirectHref += 'receive[number]=' + number;
        window.location.href = redirectHref;
    }
    
    // Already redirected to the receive page.
    var receiveUrlMatch = upperCaseHref.match(receiveUrlRegExp);
    if(receiveUrlMatch) {
        var country_code = receiveUrlMatch[1].toUpperCase();
        var number = receiveUrlMatch[2];
        
        // Prefill the country code and number.
        var country_code_input = document.getElementById('receive_country_code');
        var country_code_options = country_code_input.options;
        var country_code_options_length = country_code_options.length;
        for(var i = 0; i < country_code_options_length; i++) {
            // Find the right country code among the options.
            if(country_code_options[i].value !== country_code) {
                continue;
            }
            
            country_code_input.value = country_code;
            break;
        }
        
        var number_input = document.getElementById('receive_number');
        number_input.value = number;
    }
})();