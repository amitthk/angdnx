using System.Collections.Generic;
using angdnx.Domain;
using System;
using System.Linq;

namespace angdnx.Domain
{
    public interface INotesRepository
        {
            List<Note> GetAll();
            Note Get(Guid id);
            Guid Add(Note note);
            bool Update(Guid id, Note note);
            bool Delete(Guid id);
        }
}