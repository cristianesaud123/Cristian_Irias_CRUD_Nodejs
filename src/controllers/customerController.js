const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT municipio.municipio AS municipio,
        customer.id AS id,
        name,
        address,
        phone
        FROM customer
        LEFT JOIN municipio
        ON customer.municipio = municipio.id;
      `, (err1, customers) => {
     if (err1) {
      res.json(err1);
     }
     conn.query('SELECT * FROM municipio', (err2, municipios) => {
       if (err2) {
        res.json(err2);
       }
       res.render('customers', {
          data: customers,
          municipios
       });
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err1, rows1) => {
      conn.query("SELECT * FROM municipio", (err2, rows2) => {
        res.render('customers_edit', {
          data: rows1[0],
          municipios: rows2
        })
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
