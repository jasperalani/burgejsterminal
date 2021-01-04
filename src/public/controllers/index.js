const global = {
    cmd: null,

    title: "Burgehood Informational Terminal",
    version: "a1.0.0",
    github: "http://github.com/jasperalani/burgejsterminal",

    server: {
        ip: "burgehood.tk"
    }
}

$(function () {

    const body = $('body')

    function cmd(...objects) {
        if (objects.length > 0) {
            return body.terminal(...objects)
        }
        if (null === global.cmd) {
            global.cmd = body.terminal()
        }
        return global.cmd
    }

    function cout(...out) {
        for (const o of out) {
            cmd().echo(o)
        }
    }

    function render() {

        cmd({

            help: function () {
                cout(
                    "Commands",
                    "server ip >> Display server ip.",
                    "server status >> Display server status",
                    "discord >> Display discord server invite link."
                )
            },

            server: function (arg) {
                switch (arg) {
                    case "ip":
                        cout(global.server.ip)
                        break
                    case "status":
                        cout("Loading...")
                        $.get("https://api.mcsrvstat.us/2/" + global.server.ip, function (res) {
                            if(!res.online){
                                cout("Status: Offline")
                                return
                            }
                            cout(
                                "Status: Online",
                                "Players: " + res.players.online + "/" + res.players.max,
                                "MOTD: " + res.motd.clean,
                                "MC Version: " + res.version,
                            )
                        })
                        break
                    default:
                        cout("Incorrect usage. Use server ip/status")
                        break
                }
            },

            discord: function () {
                cout("https://discord.gg/RnKXrZQ64f")
            }

        }, {

            greetings: () => cout(
                global.title,
                "Version: " + global.version,
                "Github: " + global.github,
                "Help: type help for a list of commands"
            )

        });

    }

    if (body) {

        render()

    }

})
