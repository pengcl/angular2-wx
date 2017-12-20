db.createUser(
  {
    user: "duty",
    pwd: "Pengcl19821025",
    roles: [ { role: "readWrite", db: "duty" },
      { role: "read", db: "reporting" } ]
  }
)
