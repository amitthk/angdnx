using System;
using System.Collections.Generic;

namespace angdnx.Domain
{
   public class Note
    {
        private Guid _Id=Guid.NewGuid();
        public Guid Id
        {
            get { return _Id;}
            set { _Id = value;}
        }
        
        private string _Title;
        public string Title
        {
            get { return _Title;}
            set { _Title = value;}
        }
        
        private string _Text;
        public string Text
        {
            get { return _Text;}
            set { _Text = value;}
        }
        
        
    }
}
