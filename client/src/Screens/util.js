class Util{

    static metamaskErrorParser(error) { 
        let msg = error.message.replace("[ethjs-query] while formatting outputs from RPC ", "");
          msg = msg.slice(1, -1);
          let jsonResp = JSON.parse(msg);
          
        //   console.log("registration failed :", jsonResp);
        msg = jsonResp['value']['data']['data']['reason']
        //   console.log("registration failed :", jsonResp['value']['data']['data']['reason']);
        return msg
    }
}

export default Util;