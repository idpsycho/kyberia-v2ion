

v2out('starting')

$('head *:not(title)').remove();
$('head').append('<meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');

$('body').append('<ion-app>');


$(function() {
	v2out('done')
});

function v2out(msg) {

	var $ta = $('textarea#node_content');

	$ta.val( msg + '\n' + $ta.val() )

}
