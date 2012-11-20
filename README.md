# Mongo Base64Id - Shell Enhancement

An alternative to working with hexidecimal representations of ObjectId's in mongo.

This:

    UKZBAooUfVcAYOfa

Instead of:

    50a641028a147d570060e7da
    
That is 16 characters instead of 24 and depending on your style, you may prefer it.
    
## Motivation

After designing an API that looks something like this:

    GET http://example.com/resource/50a641028a147d570060e7da

I wondered if there was a more elegant alternative - surely a hexidecimal string is not the most compact form.

MongoDB is a great database and provides a default index field "_id" which is comprised of 12 bytes of data in a type called [ObjectID](http://www.mongodb.org/display/DOCS/Object+IDs), usually represented in hexidecimal format as above.

There are advantages to sticking with ObjectID, for example:

1. A high chance of being unique when created.
2. It includes a timestamp, so no need to create a date created field.


## Solution

Encoding the 12 ObjectId bytes into URL safe Base64 is simple and effective, meaning you can indeed write an API like this without losing the benefits of ObjectID and all without declaring another field on your document.

    GET http://example.com/resource/UKZBAooUfVcAYOfa

But what about the mongo shell? There's clearly no point of having all this indirection if the tools we have refuse to work for us.

## Usage

Link ```mongo-base64id.js``` to ```.mongorc.js``` in your home directory.

    ln -sf <mongo-base64id-dir>/mongo-base64id.js ~/.mongorc.js
    
Data is now returned in Base64Id format:

    $ mongo
    > db.users.find()
    { "_id" : Base64Id("UKZBAooUfVcAYOfa"), "email" : "john@smith.com" }

You can also query by Base64Id:

    > db.users.find(Base64Id("UKZBAooUfVcAYOfa"))
    { "_id" : Base64Id("UKZBAooUfVcAYOfa"), "email" : "john@smith.com"

What if I want to use ObjectId again? Easy:

    > setBase64Id(false)

## Copyright and Licence

Copyright 2012 Alex Jarvis

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.