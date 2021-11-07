
const controllerm = {};

controllerm.listm = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM municipio', (err, municipios) => {
     if (err) {
      res.json(err);
     }
     res.render('municipios', {
      data: municipios
     });
    });
  });
};

controllerm.savem = (req, res) => {
  const { name, departamento } = req.body;
  console.log("datos  ", req.body);
  req.getConnection((err, connection) => {
    const query = connection.query(`
      INSERT INTO
      municipio(municipio, departamento)
      VALUES("${name}", "${departamento}")
    `, (err, municipio) => {
        res.redirect('/municipios');
    })
  })
};

controllerm.editm = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM municipio WHERE id = ?", [id], (err, rows) => {
      res.render('municipio_edit', {
        data: rows[0]
      })
    });
  });
};

controllerm.updatem = (req, res) => {
  const { id } = req.params;
  const { name, dep } = req.body;
  console.log(req.body)
  req.getConnection((err, conn) => {

  conn.query(`
    UPDATE municipio
    set
    municipio = "${ name }",
    departamento = "${ dep }"
    where id = ${ id }
    `, (err, rows) => {
      res.redirect('/municipios');
    });
  });
};

controllerm.deletem = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM municipio WHERE id = ?', [id], (err, rows) => {
      res.redirect('/municipios');
    });
  });
}

module.exports = controllerm;
