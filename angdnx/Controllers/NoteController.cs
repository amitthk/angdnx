using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angdnx.Data;
using angdnx.Domain;
using Microsoft.Extensions.Logging;


namespace angdnx.Controllers
{
    [Route("api/[controller]")]
    public class NoteController : Controller
    {
        
        INotesRepository _repo;
        private readonly ILogger<NoteController> _logger;
        
        public NoteController(ILogger<NoteController> logger, INotesRepository noteRepository){
            _logger=logger;
            _repo= noteRepository;          
        }
        
        // GET api/note
        [HttpGet]
        public List<Note> Get()
        {
            return _repo.GetAll();
        }

        // GET api/note/{guid}
        [HttpGet("{id}")]
        public Note Get(string id)
        {
            var _guid = Guid.Empty;
            if((Guid.TryParse(id, out _guid))&&(_guid!=Guid.Empty)){
            return _repo.Get(_guid);
            }else
            {
                return null;
            }
        }

        // POST api/note
        [HttpPost]
        public Guid Post(Note value)
        {
            return _repo.Add(value);
        }

        // PUT api/note/{guid}
        [HttpPut("{id}")]
        public bool Put(string id, [FromBody]Note value)
        {
            var _id=Guid.Parse(id);
            _logger.LogInformation(_id.ToString());
            _logger.LogInformation("Values: "+value.Id.ToString());
             _logger.LogInformation("Title:"+value.Title);
             _logger.LogInformation("Text:"+ value.Text);
            return _repo.Update(_id,value);
        }

        // DELETE api/note/{guid}
        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            var _id= Guid.Parse(id);
            _logger.LogInformation(_id.ToString());
            return _repo.Delete(_id);
        }
    }
}
