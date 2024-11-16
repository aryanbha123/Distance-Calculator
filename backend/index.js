const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const port = 3002;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/aco', (req, res) => {
    const { source, destination } = req.query;

    const startTime = Date.now(); 

    try {
        exec(`aco.exe ${source} ${destination}`, (error, stdout, stderr) => {
            const endTime = Date.now();  
            const executionTime = endTime - startTime;  

            if (error) {
                console.error(`Exec error: ${error}`);
                return res.status(500).json({ error: stderr, executionTime });
            }

            console.log(stdout);
            res.status(200).json({
                msg: stdout,
                executionTime: `${executionTime}ms`  // Send time taken in the response
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", executionTime: 'N/A' });
    }

});

app.get('/astar', (req, res) => {
    const { source, destination } = req.query;

    const startTime = Date.now(); 

    try {
        exec(`astar.exe ${source} ${destination}`, (error, stdout, stderr) => {
            const endTime = Date.now(); 
            const executionTime = endTime - startTime; 

            if (error) {
                console.error(`Exec error: ${error}`);
                return res.status(500).json({ error: stderr, executionTime });
            }

            console.log(stdout);
            res.status(200).json({
                msg: stdout,
                executionTime: `${executionTime}ms` 
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", executionTime: 'N/A' });
    }

});

app.get('/beam', (req, res) => {
    const { source, destination } = req.query;
    console.log("Done")
    const startTime = Date.now();  

    try {
        exec(`beam.exe ${source} ${destination}`, (error, stdout, stderr) => {
            const endTime = Date.now(); 
            const executionTime = endTime - startTime;
            if (error) {
                console.error(`Exec error: ${error}`);
                return res.status(500).json({ error: stderr, executionTime });
            }

            console.log(stdout);
            res.status(200).json({
                msg: stdout,
                executionTime: `${executionTime}ms` 
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", executionTime: 'N/A' });
    }

});



app.listen(port, () => {
    console.log('Server running on http://localhost:3002');
});

