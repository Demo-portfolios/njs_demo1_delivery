const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    var sql = `
        SELECT sliImage as url
        FROM tblSlides	
        WHERE sliStatus = 1 ORDER BY sliOrder ASC
    `;
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results.length > 0){
                        res.status(200).json({
                            message: 'success',
                            data:results
                        });
                    }else{
                        res.status(200).json({
                            message: 'success',
                            data:[]
                        });
                    }
                }
                
            });
        }
    });
});

module.exports = router;