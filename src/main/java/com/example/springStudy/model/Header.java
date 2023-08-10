package com.example.springStudy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Header<T> {
    private LocalDateTime communicationTimestamp;
    private String resultCode;
    private String resultDescription;

    private T data;

    public static <T> Header<T> ACK(){
        return (Header<T>)Header.builder()
                .communicationTimestamp(LocalDateTime.now())
                .resultCode("resultCode-OK")
                .resultDescription("resultCode-OK")
                .build();
    }

    public static <T> Header<T> ACK(T data){
        return (Header<T>)Header.builder()
                .communicationTimestamp(LocalDateTime.now())
                .resultCode("ACK-OK / Data")
                .resultDescription("ACK-OK / Data")
                .data(data)
                .build();
    }

    public static <T> Header<T> ERROR(String resultDescription){
        return (Header<T>)Header.builder()
                .communicationTimestamp(LocalDateTime.now())
                .resultCode("ERROR")
                .resultDescription(resultDescription)
                .build();
    }
}
