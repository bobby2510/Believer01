let authenticate = function()
{
    let main_flag = localStorage.getItem('cricket')
    let sub_flag_one = localStorage.getItem('num1')
    let sub_flag_two = localStorage.getItem('num2')
    if(main_flag=='present' && sub_flag_one=='13' && sub_flag_two=='99')
    {
        ap = document.querySelector('#auth_panel')
        ap.style.display="none"
        fp = document.querySelector('#sport_panel')
        fp.style.display="block"
        let temp = parseInt((new Date()).getDate())+5
        let temp_sub = parseInt(localStorage.getItem('date'))
       // console.log(temp)
       // console.log(temp_sub)
        
           // console.log('here')
            store_teams()
            if(localStorage.getItem('football')==null)
            {
                 f_data = {"req_data":[]}
                localStorage.setItem('football',JSON.stringify(f_data))
            }
            if(localStorage.getItem('basketball')==null)
            {
                b_data = {"req_data":[]}
                 localStorage.setItem('basketball',JSON.stringify(b_data))
            }     
            if(localStorage.getItem('mycricket')==null)
            {
                b_data = {"req_data":[]}
                 localStorage.setItem('mycricket',JSON.stringify(b_data))
            }   
            if(localStorage.getItem('kabaddi')==null)
            {
                b_data = {"req_data":[]}
                 localStorage.setItem('kabaddi',JSON.stringify(b_data))
            } 

            localStorage.setItem('date',temp)
        
    }
    else
    {
        auth_btn=document.querySelector('#auth_btn')
        auth_btn.addEventListener('click',()=>
        {
            mobile_number = document.querySelector('#mobile_number')
            mn=mobile_number.value

            if(mn==''){raiseError('mobile number cannot be empty!'); return}
            secret_code = document.querySelector('#secret_code')
            sc=Number(secret_code.value)
            if(sc==''){raiseError('secret code cannot be empty!'); return}
            system_code= get_code(Number(mn))
            if(sc==system_code)
            {
                localStorage.setItem('cricket','present')
                localStorage.setItem('num1','13')
                localStorage.setItem('num2','99')
                localStorage.setItem('counter','1')
                localStorage.setItem('mobile_number',mn)
                fp = document.querySelector('#sport_panel')
                fp.style.display="block"
                ap = document.querySelector('#auth_panel')
                ap.style.display="none"
                SuccessMsg('Your account has been verified successfully!')
                localStorage.setItem('date',(new Date()).getDate())
                store_teams()
            }
            else{
                raiseError('Invalid secret code!')
            }
        })
    }
}
let get_code = function(mn)
{
    data = ("0" + (new Date()).getDate()).slice(-2)
    mn_str= ''+mn;
    sum=0
    for(let i=0;i<mn_str.length;i++)
        sum+=parseInt(mn_str.charAt(i))
    sum=sum+''
    return Number(`${data.charAt(1)}${sum}${sum.charAt(1)}${sum.charAt(0)}${data.charAt(0)}`)
}
