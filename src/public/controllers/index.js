const global = {
    cmd: null,

    title: "Burgehood Informational Terminal",
    version: "a1.0.1",
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

    async function getServerStatus() {
        cout("Loading...")
        const status = await $.get("https://api.mcsrvstat.us/2/" + global.server.ip)
        if(!status.online){
            cout("Status: Offline")
            return
        }
        cout("Status: Online")
        return status
    }

    function status() {
        getServerStatus().then(status => {
            cout(
                "Players: " + status.players.online + "/" + status.players.max,
                "MOTD: " + status.motd.clean,
            )
        })
    }

    function statusAdvanced() {
        getServerStatus().then(status => {
            cout(
                "Domain: " + global.server.ip,
                "IP: " + status.ip,
                "MC Version: " + status.version,
                "Plugins: " + status.plugins.raw.join(", "),
                "Software: " + status.software,
                "Port: " + status.port,
            )
        })
    }

    function render() {

        cmd({

            help: function () {
                cout(
                    "Commands",
                    "server ip >> Display server ip.",
                    "server status >> Display server status.",
                    "server status-advanced >> Display advanced server status.",
                    "discord >> Display discord server invite link."
                )
            },

            server: function (arg1) {
                switch (arg1) {
                    case "ip":
                        cout(global.server.ip)
                        break
                    case "status":
                        status()
                        break
                    case "status-advanced":
                        statusAdvanced()
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
                "Help: type help for a list of commands."
            )

        });

    }

    if (body) {

        render()

    }

})
