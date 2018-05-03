import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map'
// import { catchError } from 'rxjs/operators';

import * as $ from 'jquery'

@Injectable()
export class ApiService {

	constructor(
		public http: HttpClient,
	) {

	}

	login(login, password) {

		console.log('apiService.login', login)

		var httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/x-www-form-urlencoded',
			}),
			responseType: 'text' as 'text',
			// observe: 'response',	// nefunguje, neviem sa dostat k status kodu
		}

		var data:any = {
			login: login,
			password: password,
			event: 'login',
			login_type: 'name',
		}
		function encodeJsonAsUri(obj) {
        	var str = [];
        	for(var p in obj)
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
    	}

    	data = encodeJsonAsUri(data)

		return this.http.post('https://kyberia.sk/id/8483717', data, httpOptions).map(resp => {

			if (resp.indexOf('<center><span class=\'most_important\'>Zadal si nespravne') != -1)
				return 'error'

			return 'success'
		})

		// map(resp => {

		// 	return resp;
		// 	// if (!resp) return;

		// 	// var dump = $(resp).last().text()
		// 	// var json = JSON.parse(dump)
		// 	// return json
		// })
	}

	getTop() {

		console.log('apiService.getTop')

		return this.http.get('https://kyberia.sk/id/7313540/8481261', {
			responseType: 'text'
		}).map(resp => {

			if (!resp) return;

			var dump = $(resp).last().text()
			var json = JSON.parse(dump)
			return json
		}).map(json => {

			if (!json) return;

			json = json.map(orig => {

				var userAvatar = 'https://kyberia.sk/images/nodes/'
				userAvatar += orig.node_creator[0]+'/'
				userAvatar += orig.node_creator[1]+'/'
				userAvatar += orig.node_creator + '.gif'

				var node_content_br = orig.node_content
				if (orig.nl2br)
					node_content_br = node_content_br.replace(/\n/g, '<br>')

				orig._userAvatar = userAvatar
				orig._node_content_br = node_content_br
				return orig
			})

			return json
		})
	}
	/*
		"userAvatar": "https://kyberia.sk/images/nodes/3/4/3465216.gif",
		"userName": "kyberbubus",
		"parentName": "blogs",
		"content": "o osem rokov v námestove, soc pajzel medzi panelákmi, účasť 100+ ľudí, pritom sa organizátori na to vykašľali a nebyť toho že ja som tam dorazil ako jediný z účinkujúcch, aj by to zabudli zorganizovať. potom čo prišlo tých 100+ ľudí a zistili to zvyšné kapely čo mali hrať, dostavili sa tam tiež. taktiež sa tam dostavili aj kapely čo neboli napísané v programe, ale zahrali tiež.<br><br>raz som hral v okrese michalovce v 7miestnej indiánskej saune pred 6členným publikom, čiže vypredané<br><br>v havlíčkovom brode prišlo 5 slovákov ktorí tam boli na rozlúčke so slobodou, ale okrem mňa tam čítali bratislavskí básnici ktorí si v básňach robili srandu z bratislavy a z hokeja, tých slovákov to urazilo a zdrhli, v obecenstve ostal iba jeden miestny dôchodcovský pár. tam to šlo cez nejaký československý kultúrny fond, takže honorár bol! <br><br>v jednej obci v okrese rožňava som hral na jednom voľnom dome a došli tam hádam všetci mládežníci z obce (dokopy okolo 50) a jedna holka. keď som po množstve alkoholu zaspal v manželskej posteli, všetci tam prítomní (asi desiati) sa s ňou pomilovali rovno vedľa mňa; okrem bratislavských básnikov čo tam tiež vtedy boli so mnou a ostali v miernom šoku, potom sa vrátili do bratislavy a rozprávali strašidelné príbehy o okrese rožňava. ja som bol na obed u mamy chlapíka čo to organizoval. \"som myslela, že si satanista, ale ty si taký slušný chlapec. máme novú mačku a nechce vyliezť spoza pece, nevedel by si jej nejako dohovoriť?\"<br><br><br><br>a tak podobne, časť z toho mám pospisované a kdesi poukladané, ktovie kde všade...",
		"karma": "35"

	[{
		"node_id": "8481333",
		"node_name": "bye bye aleje",
		"node_parent": "1213219",
		"node_type": "1",
		"node_external_access": "yes",
		"node_system_access": "public",
		"node_children_count": "9",
		"node_creator": "3652720",
		"parent_node_creator": "3652720",
		"node_created": "2018-04-04 12:30:05",
		"lastchild_created": "2018-04-04 22:04:27",
		"k": "54",
		"node_views": "322",
		"node_descendant_count": "17",
		"lastdescendant_created": "2018-04-04 21:16:55",
		"template_id": "4",
		"node_updated": null,
		"external_link": "",
		"node_vector": "0000010100063539000635560121321908481333",
		"node_content": "Dnes d\u00e1vam trestn\u00e9 ozn\u00e1menie a podnet na in\u0161pekciu\n\n<img src=\"https:\/\/scontent-vie1-1.xx.fbcdn.net\/v\/t1.0-9\/29791643_1990156681234083_5239871378566807844_n.jpg?_nc_cat=0&amp;_nc_eui2=v1%3AAeHG5B3HB2QxE8Vk_NhTODTulvEc8PajscKpyfP_8ROCjiKAnBF8ISt11gzYixY84SUcXdbb1qZ7JBvyZ3WcgX0t7Jj4lnHIsOLk-xhcwtLZ3w&amp;oh=248f333274d63cfda50ac2e04a3762aa&amp;oe=5B279B36\" width=\"800\" alt=\"29791643_1990156681234083_5239871378566807844_n.jpg?_nc_cat=0&amp;_nc_eui2=v1%3AAeHG5B3HB2QxE8Vk_NhTODTulvEc8PajscKpyfP_8ROCjiKAnBF8ISt11gzYixY84SUcXdbb1qZ7JBvyZ3WcgX0t7Jj4lnHIsOLk-xhcwtLZ3w&amp;oh=248f333274d63cfda50ac2e04a3762aa&amp;oe=5B279B36\" \/>\n\n\"Aj v\u00e1s v\u017edy otravovala t\u00e1 orechov\u00e1 alej medzi Kamenicou a Pust\u00fdm Po\u013eom, \u010do tak nechutne zachyt\u00e1vala sneh z \u010cergova a robila n\u00e1\u0161 horsk\u00fd priesmyk ako tak prejazdn\u00fd? A navy\u0161e t\u00e1 nepr\u00edjemn\u00e1 esteti\u010dnos\u0165. Nebojte sa, u\u017e je to pre\u010d!\"\nwww.biomasaker.wolf.sk",
		"node_level3": "63556",
		"nl2br": "1",
		"parent_name": "Lesoochran\u00e1rske zoskupenie VLK",
		"creator": "zviera"
	}, {
	*/

}

