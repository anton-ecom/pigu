// app/config/menuItems.ts

const github_url = "https://github.com/synthetism/manifest";
export const filesItems = {
  etc: [
    {
      name: "motd.md",
      path: "/etc/motd.md",
      url: github_url + "/etc/motd.md",
    },
    {
      name: "init.md",
      path: "/etc/init.md",
      url: github_url + "/etc/init.md",
      description: "",
    },
    {
      name: "dev.md",
      path: "/etc/dev.md",
      url: github_url + "/etc/dev.md",
    },
    {
      name: "meta.md",
      path: "/etc/meta.md",
      url: github_url + "/etc/meta.md",
    },
    {
      name: "principles.md",
      path: "/etc/principles.md",
      url: github_url + "/etc/principles.md",
    },

    {
      name: "privacy.md",
      path: "/etc/privacy.md",
      url: github_url + "/etc/privacy.md",
    },

    {
      name: "constitution.md",
      path: "/etc/constitution.md",
      url: github_url + "/etc/constitution.md",
    },
  ],

  logs: [
    {
      name: "field.log.md",
      path: "/logs/field.log.md",
      url: github_url + "/logs/field.log.md",
    },
    {
      name: "events.log.md",
      path: "/logs/events.log.md",
      url: github_url + "/logs/events.log.md",
    },
  ],

  dev: [
    {
      name: "repos.log.md",
      path: "/logs/repos.log.md",
      url: github_url + "/logs/repos.log.md",
    },
    {
      name: "events.log.md",
      path: "/logs/events.log.md",
      url: github_url + "/logs/events.log.md",
    },
  ],

  groups: [
    {
      name: "readme.md",
      path: "/groups/readme.md",
      url: github_url + "/logs/readme.md",
    },

    {
      name: "groups-list.md",
      path: "/groups/groups-list.md",
      url: github_url + "/logs/groups-list.md",
    },
  ],
};
