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
                 f_data = {"req_data":[{"series_name": "EPL PREMIER LEAGUE", "series_code": "OCT301", "number_teams": 2,
                 "team_list": ["LEI1", "ARS1"], "teams": [{"team_name": "LEI1", "players_name": ["K Schmeichel", "D Ward-II", "E Jakupovic", "T Castagne", "C Soyuncu", "D Amartey", "R Pereira", "J Vestergaard", "R Bertrand", "J Evans", "L Thomas-II", "J Justin", "W Fofana", "F Benkovic", "Y Tielemans", "H Barnes", "J Maddison", "H Choudhury", "B Soumare", "W Ndidi", "M Albrighton", "N Mendy", "K Dewsbury-Hall", "J Vardy", "K Iheanacho", "P Daka", "A Perez", "A Lookman"], "players_role": [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4], "players_credits": [8.5, 8.0, 8.0, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.0, 8.0, 8.0, 8.0, 9.5, 9.0, 9.0, 8.5, 8.5, 8.5, 8.5, 8.0, 7.5, 10.5, 9.5, 9.0, 9.0, 8.5], "players_image": [44300, 44301, 44302, 44303, 44304, 44305, 44306, 44307, 44308, 44309, 44310, 44311, 44312, 44313, 44314, 44315, 44316, 44317, 44318, 44319, 44320, 44321, 44322, 44323, 44324, 44325, 44326, 44327], "players_id": [44300, 44301, 44302, 44303, 44304, 44305, 44306, 44307, 44308, 44309, 44310, 44311, 44312, 44313, 44314, 44315, 44316, 44317, 44318, 44319, 44320, 44321, 44322, 44323, 44324, 44325, 44326, 44327]}, {"team_name": "ARS1", "players_name": ["A Ramsdale", "B Leno", "K Hein", "K Tierney", "P Mari", "G Magalhaes", "T Tomiyasu", "B White", "C Soares", "C Chambers", "N Tavares", "R Holding", "S Kolasinac", "B Saka", "E S Rowe", "N Pepe", "M Odegaard", "A S Lokonga", "T Partey", "A M Niles", "M Elneny", "G Xhaka", "P Aubameyang", "A Lacazette", "G Martinelli", "F Balogun", "E Nketiah"], "players_role": [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4], "players_credits": [8.5, 8.5, 7.5, 9.0, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.0, 8.0, 8.0, 9.5, 9.5, 9.0, 9.0, 8.5, 8.5, 8.5, 8.5, 8.5, 10.0, 9.5, 9.0, 8.5, 8.5], "players_image": [44350, 44351, 44352, 44353, 44354, 44355, 44356, 44357, 44358, 44359, 44360, 44361, 44362, 44363, 44364, 44365, 44366, 44367, 44368, 44369, 44370, 44371, 44372, 44373, 44374, 44375, 44376], "players_id": [44350, 44351, 44352, 44353, 44354, 44355, 44356, 44357, 44358, 44359, 44360, 44361, 44362, 44363, 44364, 44365, 44366, 44367, 44368, 44369, 44370, 44371, 44372, 44373, 44374, 44375, 44376]}]},]}
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
