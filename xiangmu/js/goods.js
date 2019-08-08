/* 
* @Author: Marte
* @Date:   2019-08-07 20:08:51
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-08 09:08:48
*/

$(document).ready(function(){
        $.ajax({
            url: '/path/to/file',
            type: 'default GET (Other values: POST)',
            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {param1: 'value1'},
            success(res){
                console.log(res)
            }
        })
        
        






});