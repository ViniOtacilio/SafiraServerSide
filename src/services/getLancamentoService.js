const { pool } = require('../database.js');

const getLancamentoByUser = async (user_id, lanc_id, lanc_status, lanc_category, start_date, end_date) => {
   
    console.log("Dentro do service de getlancamento:" + user_id + "-" + lanc_id + "-" + lanc_status + "-" + lanc_category + "-" + start_date + "-" + end_date);

    let errors = [];

    var base_query = 'SELECT * FROM lancamentos WHERE userid IN ('+user_id+')';
    console.log(base_query);
    
    console.log(lanc_id);

    if (!user_id) {
        errors.push({ message: "Sem id de usuário" });
    }

    if (errors.length > 0) {
        throw errors;
    } else {
        if (typeof lanc_id !== 'undefined' && lanc_id){
            base_query = base_query + ' AND lanc_id IN ('+lanc_id+')';
            console.log(base_query);
        } 
        if (typeof lanc_status !== 'undefined' && lanc_status){
            let status = [];
            value = lanc_status.split(',');
            for(idx in value){
                str = "'"+value[idx]+"'";
                console.log(str);
                status.push(str);
            }
            base_query = base_query + " AND lanc_status IN ("+status.join(",")+")";
            console.log(base_query);
        }
        if (typeof lanc_category !== 'undefined' && lanc_category){
            let category = [];
            value = lanc_category.split(',');
            for(idx in value){
                str = "'"+value[idx]+"'";
                console.log(str);
                category.push(str);
            }
            base_query = base_query + ' AND lanc_category IN ('+category.join(",")+')';
            console.log(base_query);
        }
        if (typeof start_date !== 'undefined' && start_date){
            if(start_date.split('-').length != 3){
                errors.push({ message: "Formato Inválido para data inicial" });
                throw errors;
            }
            if(start_date.split('-')[0].length != 4){
                errors.push({ message: "Ano Inválido para data inicial" });
                throw errors;
            }
            if((start_date.split('-')[1].length != 2 ) || (start_date.split('-')[1] > 12) || (start_date.split('-')[1] == '00')){
                errors.push({ message: "Mês Inválido para data inicial" });
                throw errors;
            }
            if((start_date.split('-')[2].length != 2) || (start_date.split('-')[2] > 31)){
                errors.push({ message: "Dia Inválido para data inicial" });
                throw errors;
            }

            base_query = base_query + ' AND date > '+start_date;
            console.log(base_query);
        }
        if (typeof end_date !== 'undefined' && end_date){
            if(end_date.split('-').length != 3){
                errors.push({ message: "Formato Inválido para data final" });
                throw errors;
            }
            if(end_date.split('-')[0].length != 4){
                errors.push({ message: "Ano Inválido para data final" });
                throw errors;
            }
            if((end_date.split('-')[1].length != 2 ) || (end_date.split('-')[1] > 12) || (end_date.split('-')[1] == '00')){
                errors.push({ message: "Mês Inválido para data final" });
                throw errors;
            }
            if((end_date.split('-')[2].length != 2) || (end_date.split('-')[2] > 31)){
                errors.push({ message: "Dia Inválido para data final" });
                throw errors;
            }

            base_query = base_query + ' AND date < '+end_date;
            console.log(base_query);
        }
        
        pool.query(
          base_query, (err, result) => {
                if (err) {
                throw err     
            }
            return result
            }
        )
    }
}

    module.exports = {
        getLancamentoByUser
    }
