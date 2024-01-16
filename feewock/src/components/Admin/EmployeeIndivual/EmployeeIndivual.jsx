import React from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'

function EmployeeIndivual() {
  return (
    <AdminLayouts>

    <section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
              Name
            </h2>
        </div>

        <div class="grid grid-cols-1 mt-8 md:mt-20 gap-y-6 md:grid-cols-2 gap-x-10">
            <div>
                <img class="w-full mx-auto sm:max-w-xs" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/2/business-man.jpg" alt="" />
            </div>

            <div>
            
            </div>
        </div>
    </div>
</section>

</AdminLayouts>
  )
}

export default EmployeeIndivual