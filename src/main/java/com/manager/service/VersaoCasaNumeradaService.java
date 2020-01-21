
package com.manager.service;

import com.manager.entity.CodigoVerificacao;
import com.manager.entity.VersaoCasaNumerada;
import com.manager.repository.ICodigoVerificacaoRepository;
import com.manager.repository.IVersaoCasaNumerada;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VersaoCasaNumeradaService {
    
    @Autowired
    private IVersaoCasaNumerada iVersaoCasaNumerada;
    
    @Autowired
    private ICodigoVerificacaoRepository iCodigoVerificacaoRepository;
    
    @Transactional
    public VersaoCasaNumerada save(VersaoCasaNumerada versaoCasaNumerada) {
        Optional<CodigoVerificacao> numero = iCodigoVerificacaoRepository.findByNumeroGerado(versaoCasaNumerada.getCodigoVerificacao().getNumeroGerado());
        CodigoVerificacao numeroGerado = numero.get();
        versaoCasaNumerada.setCodigoVerificacao(numeroGerado);
        return iVersaoCasaNumerada.save(versaoCasaNumerada);
    }
    
}
