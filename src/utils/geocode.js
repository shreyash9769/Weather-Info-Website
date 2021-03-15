const request=require("request")
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2hyZS15YXNoNSIsImEiOiJja2txZDY0enEwM29kMnZudWVtd3I5ZjltIn0.PTo9er2UV7fRKXLnXr66Mg&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to the mapbox server",undefined)
        }
        else if(body.features.length===0){
            callback("Unable to find the location",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode