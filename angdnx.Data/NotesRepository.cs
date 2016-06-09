using System.Collections.Generic;
using angdnx.Domain;
using System;
using System.Linq;

namespace angdnx.Data
{
    public class NotesRepository : INotesRepository
    {
        List<Note> _notesList;
        public NotesRepository(){
            _notesList= new List<Note>();
            
            seed();
        }
        
        public List<Note> GetAll(){
            return(_notesList);
        }
        
        public Note Get(Guid id){
            return _notesList.FirstOrDefault(x=>x.Id==id);
        }
        
        public Guid Add(Note note){
            _notesList.Add(note);
            return note.Id;
        }

        public bool Update(Guid id, Note note){
            int idx=_notesList.FindIndex(x=>x.Id==id);
            if(idx!=-1){
                note.Id=id;
                _notesList[idx]=note;
                return true;
            }else{
                return false;
            }
        }
        
        public bool Delete(Guid id){
            var note= _notesList.FirstOrDefault(x=>x.Id==id);
            if (note!=null)
            {
                _notesList.Remove(note);
                return(true);
            }else
            {
                return false;
            }
        }
        
        private void seed(){
            _notesList.Add(new Note(){
                Id=Guid.NewGuid(),
                Title="One",
                Text="1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  1"
            });
                        _notesList.Add(new Note(){
                Id=Guid.NewGuid(),
                Title="2",
                Text="2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  2"
            });
                        _notesList.Add(new Note(){
                Id=Guid.NewGuid(),
                Title="3",
                Text="3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  3"
            });
                        _notesList.Add(new Note(){
                Id=Guid.NewGuid(),
                Title="4",
                Text="4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  4"
            });
                        _notesList.Add(new Note(){
                Id=Guid.NewGuid(),
                Title="5",
                Text="5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  5"
            });
        }
    }
}