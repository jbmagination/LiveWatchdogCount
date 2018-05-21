/**
 * Created by Mitchell Katz on 11/6/2016.
 */
(function() {
    var updateRate = 0.000000000000000001 * 1000;
    var logged = false;
    var last = 0;
    function update() {
        if (!logged) {
            console.log("Dude its updating, you hyped. Maybe in 100k runs the veteran reward update will come out");
			logged = !logged;
		}
        $.ajax({
            dataType: "json",
            url: "https://api.plancke.io/watchdogStats",
            success: function(response) {
                if (last === 0) {
                    last = response.record.watchdog_total;
                }
                var $start = $('#start'), start = last, $reset = $('#reset'), reset = $reset.get(0), $counter = $('#counter'), startVal = last, currentVal, endVal = response.total, prefix = 'Players: ', fontSize = $counter.css('font-size');
                currentVal = startVal;
                var i = setInterval(function() {
                    if (currentVal === response.record.watchdog_total) {
                        clearInterval(i);
                        $counter.text(prefix + currentVal);
                    } else if (currentVal < response.record.watchdog_total) {
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
                document.getElementById("number").innerHTML = "Total bans: " + response.record.watchdog_total + "<br>Last 60 seconds: " + response.record.watchdog_lastMinute;
            }
        });
    }
    $(document).ready(function() {
        setInterval(update, updateRate);
        update();
    });
})();
