const   appGenerator = require('../generator/application_generator'),
        appDescriptorWriter = require('../export/app_description_file_writer'),
        express = require('express'),
        router = express.Router(),
        authenticationMiddleware = require('./auth/authentication_middleware');


/* Make sur that the user is connected */
//router.use(authenticationMiddleware);

/**
 * Write the yo-rc.json file on the specified directory
 * and generate the application
 * req.body = {
 *      directory: string
 *      applicationDescription: Object
 * }
 */
router
    .post('/application', function(req, res){
        var args = {
            directory: req.body.directory,
            applicationDescription : req.body.applicationDescription
        }

        try{
            appDescriptorWriter.write(args);
            appGenerator.generate(req.body.directory, function(){
                res.status(200).send(JSON.stringify(
                    {
                        message : 'The JHipster application has been generated.'
                    }
                ));
            });
        }catch(err){
            res.status(500).send(JSON.stringify(
                {
                    error : {
                        code: 500,
                        message: 'An error has occurred: '+ err
                    }
                }
            ));
            return;
        }
    });

router
    .post('/application/remove', function(req, res){
        var args = {
            directory: req.body.directory
        }
        appDescriptorWriter.remove(args);
    });
module.exports = router;