package com.example.taxirural.disponibilite

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.taxirural.databinding.FragmentDisponibiliteBinding
import com.google.firebase.database.*

class DisponibiliteFragment : Fragment() {
    private lateinit var binding: FragmentDisponibiliteBinding
    private lateinit var dbRef: DatabaseReference

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        binding = FragmentDisponibiliteBinding.inflate(inflater, container, false)
        dbRef = FirebaseDatabase.getInstance().getReference("taxis")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val result = StringBuilder()
                for (taxiSnap in snapshot.children) {
                    val id = taxiSnap.child("id").getValue(String::class.java)
                    val dispo = taxiSnap.child("disponible").getValue(Boolean::class.java)
                    result.append("Taxi $id - ${if (dispo == true) "Disponible" else "Occupé"}
")
                }
                binding.textDisponibilite.text = result.toString()
            }

            override fun onCancelled(error: DatabaseError) {}
        })

        return binding.root
    }
}