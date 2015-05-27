
You need to:

    cp settings.json.sample settings.json

fill in the details and then:

    ./run

You should then be able to upload .png, .jpeg and .gif images to your S3 bucket.


I did:

    meteor create meteor-slingshot-example
    meteor add edgee:slingshot
    # ... copied in the code from the slingshot README

and then made a minimal set of changes to get uploads working.
