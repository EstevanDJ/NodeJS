import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM  employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'algo no funciona'
        })
    }
}

export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee Where id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Employe no funciona'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'algo no funciona'
        })
    }
}

export const createEmployee = async (req, res) => {
    const { nombre, salario } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO employee(nombre, salario) VALUES (?, ?)', [nombre, salario])
        res.send({
            id: rows.insertId,
            nombre,
            salario,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'algo no funciona'
        })
    }
}

export const deleteEmploye = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee no funciona'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'algo no funciona'
        })
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { nombre, salario } = req.body

    try {
        const [result] = await pool.query('UPDATE employee SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?', [nombre, salario, id])

        console.log(result)

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'algo no funciona'
        })
    }
}