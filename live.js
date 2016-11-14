/**
 * Created by Mitchell Katz on 11/6/2016.
 */
(function() {
    var updateRate = 5 * 1000;
    var logged = false;
    var last = 0;
    function update() {
        if (!logged) {
            console.log("Dude its updating, you hyped. Maybe in 100k runs the veteran reward update will come out");
			logged = !logged;
		}
        $.ajax({
            dataType: "json",
            url: "http://watchdog.cryptkpr.me:4567/current",
            success: function(response) {
                if (last === 0) {
                    last = response.count;
                }
                var $start = $('#start'), start = last, $reset = $('#reset'), reset = $reset.get(0), $counter = $('#counter'), startVal = last, currentVal, endVal = response.total, prefix = 'Players: ', fontSize = $counter.css('font-size');
                currentVal = startVal;
                var i = setInterval(function() {
                    if (currentVal === response.total) {
                        clearInterval(i);
                        $counter.text(prefix + currentVal);
                    } else if (currentVal < response.total) {
                        if (response - last < 1000) {
                            currentVal += Math.abs(response - last) / 1000;
                        } else {
                            currentVal++;
                        }
                        $counter.text(prefix + currentVal);
                    } else {
                        if (last - response > 1000) {
                            currentVal -= Math.abs(response - last) / 1000;
                        } else {
                            currentVal--;
                        }
                        $counter.text(prefix + currentVal);
                    }
                }, 2000 / Math.abs(last - currentVal));
                last = endVal;
                document.getElementById("number").innerHTML = "Total bans: " + response.total + "<br>Last 60 seconds: " + response.perMinute;
            }
        });
    }
    $(document).ready(function() {
        setInterval(update, updateRate);
        update();
    });
})();
