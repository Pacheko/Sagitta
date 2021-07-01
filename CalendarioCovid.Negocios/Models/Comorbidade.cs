using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Comorbidade
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public bool IsComorbidade { get; set; }


            //id  descricao     comormidade
            //0   Asma               true
            //1   Pressao            true
            //2   Corpo de Bombeiros false
            //3   Professores        false
    }
}
