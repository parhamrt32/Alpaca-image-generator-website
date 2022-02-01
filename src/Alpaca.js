
export default function Alpaca({design = []}){


    
    return(
        <div className="alpaca">
            {
                Object.values(design).map((item,index) => {
                    let folder = Object.keys(design)[index].toLocaleLowerCase();
                    

                    if(folder === 'backgrounds'){
                        item = item.replace(' ','').toLocaleLowerCase();
                    } else{
                        item = item.replace(' ' , '-').toLocaleLowerCase()
                    }

                    return(
                        <img className={`${folder} alpaca-img`} key={index} src={require(`./alpaca/${folder}/${item}.png`)} alt="" />
                    )
                    

                } )
            }
        </div>
    )
    
}